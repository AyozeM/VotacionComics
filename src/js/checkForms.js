import $ from 'jquery';
import toastr from 'toastr';
/**
 * comprueba la inegridad del formulario
 */
export const checkForm = () =>{
    $(".failed").removeClass("failed");
    let checkOK = true;
    if(!checkRequired() || !checkEmail() || !checkNumber() || !checkPasswd() || !checkPhone()){
        checkOK = false;
    }
    return checkOK;
};
/**
 * comprueba que los campos requeridos no esten en blanco
 */
const checkRequired = () =>{
    let checkOK = true;
    $("input[required]").each(function(){
        if($(this).val().length < 1){
            checkOK = false;
            $(this).addClass("failed");
            toastr.error(`El campo ${$(this).siblings('span').text()} es obligatorio`);
        }
    });
    return checkOK;
};
/**
 * Comprueba la validez de los email
 */
const checkEmail = () =>{
    let checkOK = true;
    $('input[type="email"]').each(function(){
        if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($(this).val())){
            checkOK = false;
            $(this).addClass("failed");
            toastr.error("El formato del email es incorrecto");
        }
    });
    return checkOK;
}
const checkPhone = () =>{
    let checkOK = true;
    $("input[tel]").each(function(){
        if(!/^\d{9-10}$/.test($(this).val())){
            checkOK = false;
            $(this).addClass("failed");
            toastr.error("El telefono ha de tener entre 9 y 10 digitos");
        }
    });
    return checkOK;
}
/**
 * Comprueba que los campos numericos sean numericos
 */
const checkNumber = () =>{
    let checkOK = true;
    $("input[number]").each(function(){
        let n = parseInt($(this).val());
        let min = parseInt($(this).attr("min"));
        let max = parseInt($(this).attr("max"));
        if(typeof(n) == "NaN" || n < min || n > max){
            checkOK = false;
            $(this).addClass("failed");
            toastr.error("En la edad solo se permiten numeros enteros entre 1 y 120");
        }
    });
    return checkOK;
}
/**
 * Comprueba que las contraseñas sean iguales
 */
const checkPasswd = () =>{
    let passwd1,passwd2;
    let checkOK = true;
    $('input[type="password"]').each(function(i){
        i%2 == 0 ? passwd2 = $(this).val() : passwd1 = $(this).val();
    });
    if(passwd1 != passwd2){
        checkOK = false;
        $("#repeatPassword").addClass("failed");
        toastr.error("Las contraseñas no coinciden")
    }
    return checkOK;
}