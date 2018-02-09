import $ from 'jquery';
import { paginator } from './paginator';
import { getCharacters,getComics } from './ajaxTools';
let book;
let offset = 0;
let limit = 100;
export const createPaginator = method =>{    
    book = new paginator($("section").children(),10,"section");
    $("prev").off("click");
    $("next").off("click");

    $("prev").click(e=>{
        let aux = -- book.actualPage;
        if(aux < 0 && offset > 0){
            $("section").children().remove();
            offset -= limit;
            getCharacters({offset:offset,limit:100},$("section"),createPaginator);
        }else{
            book.changePage(aux);
        }
    });
    $("next").click(e=>{
        let aux = ++ book.actualPage ;
        if(aux > book.pages-1){
            $("section").children().remove();
            offset+=limit;
            switch(method){
                case 'comics':
                    getComics({offset:offset,limit:100},$("section"),createPaginator);
                    break;
                case 'characters':
                    getCharacters({offset:offset,limit:100},$("section"),createPaginator);
                    break;
            }
        }else{
            book.changePage(aux);
        }
    });
    return createPaginator;
}