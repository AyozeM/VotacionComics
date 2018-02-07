import $ from 'jquery';
/**
 * Pagina el contenido de un elemento
 * @class
 */
export class paginator{
    constructor(itemsOnPage,container){
        this.items = $(container).children().length;
        this.itemsOnPage = itemsOnPage;
        this.pages = this.items / itemsOnPage;
        this.actualPage = 0;
        this.container = container;
        this.index = this.createMatrix($(container).children());
        this.prepare();
        this.drawPage();
    }
    /**
     * Crea una representacion de la paginacion visual mediante una matriz
     * @param {htmlCollection} elements 
     */
    createMatrix(elements){
        let schema = [];
        let start = 0;
        let end = this.itemsOnPage;
        for (let i = 0; i < this.pages; i++) {
            if(end > elements.length){
                schema.push(elements.slice(start-elements.length));
            }else{
                schema.push(elements.slice(start,end));
            }
            start += this.itemsOnPage;
            end += this.itemsOnPage;
            
        }
        return schema;
    }
    /**
     * Prepara el contenedor para el paginado
     */
    prepare(){
        $(this.container).children().remove();
        $(this.container).append(
            $("<content></content>")
        ).append(
            $("<controls></controls>").append(
                $(`<first data-page="0"><<</first>`).click(e=>{
                    this.changePage($(e.currentTarget).data("page"))
                })
            ).append(
                $(`<prev data-page="1"><</prev>`).click(e=>{
                    let aux = this.actualPage - parseInt($(e.currentTarget).data("page"));
                    this.changePage(aux)
                })
            ).append(
                $(`<next data-page="1">></next>`).click(e=>{
                    let aux = this.actualPage + parseInt($(e.currentTarget).data("page"));
                    this.changePage(aux)
                })
            ).append(
                $(`<last data-page="${this.index.length-1}">>><last>`).click(e=>{
                    this.changePage($(e.currentTarget).data("page"))
                })
            )
        );
    }
    /**
     * Dibuja la pagina actual
     */
    drawPage(){
        for (let i = 0; i < this.index[this.actualPage].length; i++) {
            const element = this.index[this.actualPage][i];
            $(element).appendTo("content");
        }
    }
    /**
     * Limpia el contenedor de elementos
     */
    clean(){
        $(this.container).find("content").children().remove();
    }
    /**
     * Cambia de pagina, comprobando que no se sale fuera de los limites
     * @param {Int} newPage -> posible nueva pagina
     */
    changePage(newPage){
        newPage = parseInt(newPage);
        this.clean();
        if(newPage > -1 && newPage < this.index.length){
            this.actualPage = newPage;
        }
        this.drawPage();
    }
    
}