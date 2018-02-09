import $ from 'jquery';
import {getCharacters} from './ajaxTools';
import { paginator } from './paginator';
import {selectItem} from './main';
import { createPaginator } from './personalPaginator';
$(document).ready(()=>{
    getCharacters({limit:100},$("section"),createPaginator);
    $("section").on("click",'.item',e=>{
        selectItem(e.currentTarget);
        window.location = window.location.href.replace("characters","details");
    });
});