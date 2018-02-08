import $ from 'jquery';
import {getComics,getCharacters} from './ajaxTools';

$(document).ready(()=>{
    getComics({limit:5,dateDescriptor:"lastWeek"},$(".comics"));
    getCharacters({limit:5},$(".characters"));

    $("section").find("div").on("click","div",e=>{
        alert($(e.currentTarget).data("id"));
    });
    $("#search").click(e=>{
        alert($(e.currentTarget).siblings("inupt").val());
    });
});

