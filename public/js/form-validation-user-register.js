const form = document.querySelector("form");

const inputName = form.querySelector("#nombre");
const inputSurname = form.querySelector("#apellido");
const inputEmail = form.querySelector("#email");
const inputPassword = form.querySelector("#password");
const inputImage = form.querySelector("#image");

const inputArray = [inputName, inputSurname, inputEmail, inputPassword, inputImage];

const errorName = form.querySelector(".msg-error-name");
const errorSurname = form.querySelector(".msg-error-surname");
const errorEmail = form.querySelector(".msg-error-email");
const errorPassword = form.querySelector(".msg-error-password");
const errorImage = form.querySelector(".msg-error-image");

const errorArray = [errorName, errorSurname, errorEmail, errorPassword, errorImage];

const errorReset = () => {
    errorArray.forEach(msg => {
        msg.innerHTML = "";
    });
}

const validate = (e) => {
    // Inicializar asumiendo que no hay errores.
    let hasErrors = false;
    errorReset();

    if(!inputName.value){
        hasErrors = true;
        errorName = "Por favor ingrese su nombre";
    }

    if(!inputSurname.value){
        hasErrors = true;
        errorName = "Por favor ingrese su apellido";
    }

    if(!inputEmail.value){
        hasErrors = true;
        errorName = "Por favor ingrese su e-mail";
    }

    // Utilizamos una expresión regular, que hace de patrón de búsqueda
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!regex.test(inputEmail.value)){
        hasErrors = true;
        errorName = "No es en formato e-mail";
    }

    if(!inputPassword.value){
        hasErrors = true;
        errorName = "Por favor ingrese una contraseña";
    }
}