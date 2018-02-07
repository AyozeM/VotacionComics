import $ from 'jquery';
import {marvelApi} from './constants';
$(document).ready(()=>{
    getLastComics();
    getCharacters();
    $("section").find("div").on("click","div",e=>{
        alert($(e.currentTarget).data("id"));
    });
    $("#search").click(e=>{
        alert($(e.currentTarget).siblings("inupt").val());
    });
});
const getCharacters = () =>{
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.characters}`,
        success:response=>{
            $(".characters").find(".preloader").remove();
            response.data.results.map(e=>{
                createHTML({name:e.name,img:`${e.thumbnail.path}.${e.thumbnail.extension}`,id:e.id}).appendTo(".characters");
            })
        },
        data:{apikey:marvelApi.key,limit:5},
        error:()=>{
            alert("Hubo un fallo");
        },
        beforeSend:()=>{
            $(".characters").append(
                createPreloader("Cargando personajes...")
            )
        }
    });
};
const createHTML = data =>
    $("<div>",{class:'item','data-id':data.id}).append(
        $(`<p>${data.name}</p>`)
    ).append(
        $("<img>",{src:`${data.img}`})
    );

const createPreloader = text=>$(`<p class="preloader">${text} <i class="fas fa-spinner fa-pulse"></i></p>`)
/**
 * Obtiene e inserta 5 comics de la ultima semana
 */
const getLastComics = () =>{
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.comics}`,
        success:response=>{
            $(".comics").find(".preloader").remove();
            response.data.results.map(e=>{
                createHTML({name:e.title,img:`${e.thumbnail.path}.${e.thumbnail.extension}`,id:e.id}).appendTo("section .comics");
            });
        },
        beforeSend:()=>{
            $(".comics").append(
                createPreloader("Cargando comics...")
            )
        },
        data:{apikey:marvelApi.key,limit:5,dateDescriptor:"lastWeek"},
        error:()=>{
            alert("hubo un error");
        }
    });
};