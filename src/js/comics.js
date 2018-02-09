import $ from 'jquery';
import {getComics, getCharacters} from './ajaxTools';
import { paginator } from './paginator';
import { selectItem } from './main';
import { createPaginator } from './personalPaginator';
$(document).ready(()=>{
    getComics({limit:100},$("section"),createPaginator);
    $("section").on("click",".item",e=>{
        selectItem(e.currentTarget);
        window.location = window.location.href.replace("comics","details");
    })
});