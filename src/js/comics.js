import $ from 'jquery';
import * as ajax from './ajaxTools';
import { paginator } from './paginator';
$(document).ready(()=>{
    ajax.getComics({limit:100},$("section"),true);
});
