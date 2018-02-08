import $ from 'jquery';
import {getCharacters} from './ajaxTools';
import { paginator } from './paginator';
$(document).ready(()=>{
    getCharacters({limit:100},$("section"),true);
});
let book;
let offset = 0;
let limit = 100;
export const createPaginator = () =>{    
    book = new paginator($("section").children(),10,"section");
    $("prev").off("click");
    $("next").off("click");

    $("prev").click(e=>{
        let aux = -- book.actualPage;
        if(aux < 0 && offset > 0){
            $("section").children().remove();
            offset -= limit;
            getCharacters({offset:offset,limit:100},$("section"),true);
        }else{
            book.changePage(aux);
        }
    });
    $("next").click(e=>{
        let aux = ++ book.actualPage ;
        if(aux > book.pages-1){
            $("section").children().remove();
            offset+=limit;
            getCharacters({offset:offset,limit:100},$("section"),true);
        }else{
            book.changePage(aux);
        }
    });
}