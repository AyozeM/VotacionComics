import $ from 'jquery';
import * as ajax from './ajaxTools';

$(document).ready(()=>{
    ajax.getComics({limit:100},$("section"));
});
