import $ from 'jquery';
import {getSingleComic,getSingleCharacter} from './ajaxTools';
$(document).ready(()=>{
    let actual = JSON.parse(localStorage.getItem("selectedItem"));
    switch(actual.type){
        case "comic":
            getSingleComic(actual.id,$("section"),completeDetails);
            break;
        case "character":
        getSingleCharacter(actual.id,$("section"),completeDetails);
            break;
    }
});

const completeDetails = data =>{
    
    $("article").prepend(
        $(`<h1>${data.title}</h1>`)
    ).find("img").attr("src",data.img).attr("alt",`portada del comic ${data.title}` );

    $("article").find("div").append(
        $(`<p>${data.description}</p>`).prepend(
            $("<h3>Decripcion</h3>")
        )
    )
}