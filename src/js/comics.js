import $ from 'jquery';
import {getComics} from './ajaxTools';
import { paginator } from './paginator';
$(document).ready(()=>{
    getComics({limit:100},$("section"),createPagination);
});
let book;
let offset = 0;
let limit = 100;
const createPagination = ()=>{
    book = new paginator($("section").children(),10,"section");
    $("prev").off("click");
    $("next").off("click");

    $("prev").click(e=>{
        let aux = -- book.actualPage;
        if(aux < 0 && offset > 0){
            $("section").children().remove();
            offset -= limit;
            getComics({offset:offset,limit:100},$("section"),createPagination);
        }else{
            book.changePage(aux);
        }
    });
    $("next").click(e=>{
        let aux = ++ book.actualPage ;
        if(aux > book.pages-1){
            $("section").children().remove();
            offset+=limit;
            getComics({offset:offset,limit:100},$("section"),createPagination);
        }else{
            book.changePage(aux);
        }
    });
}
