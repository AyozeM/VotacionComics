import $ from 'jquery';
import {getSingleComic,getSingleCharacter} from './ajaxTools';
import {checkForm} from './checkForms';
import toastr from 'toastr';
let actual;
let allDescription;
let name;
$(document).ready(()=>{
    actual = JSON.parse(localStorage.getItem("selectedItem"));
    switch(actual.type){
        case "comic":
            getSingleComic(actual.id,$("section"),completeDetails);
            break;
        case "character":
        getSingleCharacter(actual.id,$("section"),completeDetails);
            break;
    }
    $("#vote").click(() =>{
        let scores = JSON.parse(localStorage.getItem("scores"));
        
        if(scores != null){
            let aux = scores[`${actual.type}s`].findIndex(e=>e.id==actual.id);
            aux < 0 ? scores[`${actual.type}s`].push({id:actual.id,score:1,text:name}) : scores[`${actual.type}s`][aux].score++;
            
        }else{
            scores = {
                comics:[],
                characters:[]
            }
            scores[`${actual.type}s`].push({
                id:actual.id,
                text:name,
                score:1
            })
        }
        localStorage.setItem("scores",JSON.stringify(scores));
        window.location  = window.location.href.replace("details","statistics");
    });
    $("form").on("click","button",e=>{
        e.preventDefault();
        if(checkForm()){
            let raffle = JSON.parse(localStorage.getItem("raffle"));
            raffle != null ? raffle.push(createRaffleProfile()) : raffle = [createRaffleProfile];
            localStorage.setItem("raffle",JSON.stringify(raffle));
            $("form").find("input").val("");
            toastr.info("Datos almacenados");
        }
    });

    $("article").on("click","#show",e=>{
        if($(e.currentTarget).text() == "ver mas"){
            $(e.currentTarget).text("ver menos");
            $("#description").text(allDescription);
        }else{
            $(e.currentTarget).text("ver mas");
            $("#description").text(allDescription.substr(0,20));
        }
    });
});
const createRaffleProfile = () =>{
    return {
        name:$("#name").val(),
        phone:$("#phone").val(),
        email:$("#email").val()
    }
}
const completeDetails = data =>{
    if(data.description == "" || data.description == null){
        data.description = "Descripción no disponible";
    }
    $("article").prepend(
        $(`<h1>${data.title}</h1>`)
    ).find("img").attr("src",data.img).attr("alt",`portada del comic ${data.title}` );

    $("article").find("div").append(
        $(`<p>`).append(
            $("<h3>Decripcion</h3>")
        ).append(
            $(`<span id="description">${data.description.substr(0,20)}</span>`)
        ).append(
            $(`<span id="show">ver mas</span>`)
        )
    )
    allDescription = data.description;
    name = data.title;
}
