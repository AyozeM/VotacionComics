import $ from 'jquery';
import { marvelApi } from "./constants";
import { paginator } from './paginator';
/* import { createPaginator } from './characters';
import { createPaginatorComic}  from './comics'; */
/**
 * Crea el mensaje de error
 * @param {string} text  -> texto a visualizar
 */
const createError = text =>$(`<p>${text} <i class="fas fa-exclamation-triangle"></i></p>`)
/**
 * Crea la estructura html con la que se representaran los datos
 */
const createHTML = data =>
    $("<div>",{class:'item','data-id':data.id,'data-type':data.type}).append(
        $(`<p>${data.name}</p>`)
    ).append(
        $("<img>",{src:`${data.img}`})
    );
/**
 * Crea el preloader
 * @param {string} text -> texto a visualizar 
 */
const createPreloader = text=>$(`<p class="preloader">${text} <i class="fas fa-spinner fa-pulse"></i></p>`)
/**
 * añade la key de la api a la lista de parametros
 * @param {Object} data -> parametros ya definidos 
 */
const addKey = data => {data == null ? data = {apikey:marvelApi.key}:data['apikey'] = marvelApi.key;
return data}
/**
 * Obtiene los comics de la api y los incrusta en la pagina
 * @param {Object} queryParams -> parametros de busqueda
 * @param {jquery html elemnt} container -> contenedor de resltados
 */
export const getComics = (queryParams = null,container,paginatorOn = null) =>{
    queryParams = addKey(queryParams);
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.comics}`,
        success:response=>{
            container.find(".preloader").remove();
            response.data.results.map(e=>{
                createHTML({name:e.title,img:`${e.thumbnail.path}.${e.thumbnail.extension}`,id:e.id,type:"comic"}).appendTo(container);
            });
            if(paginatorOn != null){
                paginatorOn('comics');
            }
        },
        beforeSend:()=>{
            container.append(
                createPreloader("Cargando comics...")
            )
        },
        data:queryParams,
        error:()=>{
            container.find(".preloader").remove();
            createError("No se pudieron cargar los comics").appendTo(container)
        }
    });
}
/**
 * Obtiene los personajes de la api y los incrusta en la pagina
 * @param {Object} queryParams -> lista de parametros para la api
 * @param {jquery html element} container -> contenedor de los resultados
 */
export const getCharacters = (queryParams = null,container,paginatorOn = null) =>{
    queryParams = addKey(queryParams);
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.characters}`,
        success:response=>{
            container.find(".preloader").remove();
            response.data.results.map(e=>{
                createHTML({name:e.name,img:`${e.thumbnail.path}.${e.thumbnail.extension}`,id:e.id,type:"character"}).appendTo(container);
            })
            if(paginatorOn != null){
                paginatorOn('characters');
            }
        },
        data:queryParams,
        error:()=>{
            container.find(".preloader").remove();
            createError("No se pudieron cargar los personajes").appendTo(container)
        },
        beforeSend:()=>{
            createPreloader("Cargando personajes...").appendTo(container);
        }
    });
};
export const getSingleComic = (id,container,action) =>{
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.comics}/${id}`,
        data:{apikey:marvelApi.key},
        success:response=>{
            container.find(".preloader").remove();
            const aux = response.data.results[0];
            action({
                title : aux.title,
                description : aux.description,
                img : `${aux.thumbnail.path}.${aux.thumbnail.extension}`
            })
        },
        error:(xhr,x,y)=>{
            container.find(".preloader").remove();
            createError("No se pudieron cargar los detalles de este comic").appendTo(container)
        },
        beforeSend:()=>{
            createPreloader("Cargando detalles del comic...").appendTo(container);
        }
    });
}
export const getSingleCharacter = (id,container,action) =>{
    $.ajax({
        url:`${marvelApi.url}${marvelApi.methods.characters}/${id}`,
        data:{apikey:marvelApi.key},
        success:response=>{
            container.find(".preloader").remove();
            const aux = response.data.results[0];
            action({
                title : aux.name,
                description : aux.description,
                img : `${aux.thumbnail.path}.${aux.thumbnail.extension}`
            })
        },
        error:(xhr,x,y)=>{
            container.find(".preloader").remove();
            createError("No se pudieron cargar los detalles de este comic").appendTo(container)
        },
        beforeSend:()=>{
            createPreloader("Cargando detalles del comic...").appendTo(container);
        }
    });
}