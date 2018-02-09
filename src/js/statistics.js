import $ from 'jquery';
let dataComics,dataCharacters;
let chartDataComic,chartDataCharacter;
let tipoGraficaComic,tipoGraficaCharacter;
$(document).ready(()=>{
    let scores = JSON.parse(localStorage.getItem("scores"));

    tipoGraficaComic = $("#comics").find(".controls").find("input[checked]").val();
    tipoGraficaCharacter = $("#characters").find(".controls").find("input[checked]").val();

    $("#comics").find(".controls").find("input[checked]").closest("label").addClass("optG");
    
    $("#characters").find(".controls").find("input[checked]").closest("label").addClass("optG");
    

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawComics);
    chartDataComic = prepareData(scores.comics);

    google.charts.setOnLoadCallback(drawCharacters);
    chartDataCharacter = prepareData(scores.characters);

    $(window).resize(()=>{
        drawComics();
        drawCharacters();
    })

    $("#comics").on("change","input",e=>{
        const tag = $(e.currentTarget);
        tipoGraficaComic = tag.val();
        $("#comics").find("label").removeClass();
        tag.closest("label").addClass("optG");
        drawComics();

    });
    $("#characters").on("change","input",e=>{
        const tag = $(e.currentTarget);
        tipoGraficaCharacter = tag.val();
        $("#characters").find("label").removeClass();
        tag.closest("label").addClass("optG");
        drawCharacters();
    });

});
const drawComics = () =>{
    let container = document.querySelector("#comics").children[1];
    let data = new google.visualization.DataTable();
    data.addColumn('string','comic');
    data.addColumn('number','votos');
    data.addRows(chartDataComic);

    let options = {'title':'Porcentaje de votos por comics','width':window.innerWidth,'height':75*window.innerHeight/100,is3D:true};
    let graphic;
    switch (tipoGraficaComic) {
        case 'circulo':
            graphic = new google.visualization.PieChart(container);
            break;
        case 'area':
            graphic = new google.visualization.AreaChart(container);
            break;
        case 'columnas':
            graphic = new google.visualization.ColumnChart(container);
            break;
    }
    
    graphic.draw(data,options);
}
const drawCharacters = () =>{
    let container = document.querySelector("#characters").children[1];
    let data = new google.visualization.DataTable();
    data.addColumn('string','personaje');
    data.addColumn('number','votos');
    data.addRows(chartDataCharacter);

    let options = {'title':'Porcentaje de votos por personajes','width':window.innerWidth,'height':75*window.innerHeight/100,is3D:true};
    let graphic;
    switch (tipoGraficaCharacter) {
        case 'circulo':
            graphic = new google.visualization.PieChart(container);
            break;
        case 'area':
            graphic = new google.visualization.AreaChart(container);
            break;
        case 'columnas':
            graphic = new google.visualization.ColumnChart(container);
            break;
    }
    
    graphic.draw(data,options);
}
const prepareData = scores =>{
    let graphicData = [];
    scores.map(e=>{
        graphicData.push([e.text,e.score]);
    });
    return graphicData;
}
