import $ from 'jquery';
import * as ajax from './ajaxTools';
import { paginator } from './paginator';
$(document).ready(()=>{
    //ajax.getComics({limit:100},$("section"));
    let x = new paginator(3,"section");
    let suso = 0;
});
