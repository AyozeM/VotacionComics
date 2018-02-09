import $ from 'jquery';
import {getComics,getCharacters} from './ajaxTools';

$(document).ready(()=>{
    getComics({limit:5,dateDescriptor:"lastWeek"},$(".comics"));
    getCharacters({limit:5},$(".characters"));

    $("section").find("div").on("click","div",e=>{
        selectItem(e.currentTarget);
        window.location  += "html/details.html"; 
    });
    $("#search").click(e=>{
        alert($(e.currentTarget).siblings("inupt").val());
    });
});

export const selectItem = tag =>{
    localStorage.setItem("selectedItem",JSON.stringify({
        id:$(tag).data("id"),
        type:$(tag).data("type")
    }));
}