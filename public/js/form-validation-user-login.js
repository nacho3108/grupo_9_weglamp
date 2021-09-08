window.addEventListener("load", () => {
    let form = document.querySelector("form");

    let inputEmail = form.querySelector("#email");
    let inputPassword = form.querySelector("#password");
    

    let inputArray = [inputEmail, inputPassword];

    let errorEmail = form.querySelector(".msg-error-email");
    let errorPassword = form.querySelector(".msg-error-password");

    let errorArray = [ errorEmail, errorPassword];

    const errorReset = () => {
        errorArray.forEach(msg => {
            msg.innerHTML = "";
        });
    }

    const validate = e => {
        // Inicializar asumiendo que no hay errores.
        let hasErrors = false;
        errorReset();


        if(!inputEmail.value){
            hasErrors = true;
            errorEmail.innerText = "Por favor ingrese su e-mail";
        }

        // Utilizamos una expresión regular, que hace de patrón de búsqueda
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!regex.test(inputEmail.value)){
            hasErrors = true;
            errorEmail.innerText = "El formato del e-mail no es válido";
        }


        if(!inputPassword.length < 8){
            hasErrors = true;
            errorPassword.innerText = "Por favor ingrese una contraseña de más de 8 caracteres de largo";
        }

        const validFormats = /(\.jpg|\.jpeg|\.png)$/i;
        if(!validFormats.exec(inputImage.value)){
            hasErrors = true;
            errorImage.innerText = "Por favor ingrese una imagen de formato JPG o PNG";
        }
        return hasErrors;
    }

    form.addEventListener("submit", e => {
        if(validate(e)){
            e.preventDefault();
        }
    });
});