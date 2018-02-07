import $ from 'jquery';
import * as ajax from './ajaxTools';

$(document).ready(()=>{
    ajax.getComics({limit:5,dateDescriptor:"lastWeek"},$(".comics"));
    ajax.getCharacters({limit:5},$(".characters"));
    $("section").find("div").on("click","div",e=>{
        alert($(e.currentTarget).data("id"));
    });
    $("#search").click(e=>{
        alert($(e.currentTarget).siblings("inupt").val());
    });
});

