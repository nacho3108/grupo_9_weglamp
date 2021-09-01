window.addEventListener("load", () => {
    let form = document.querySelector("form");

    let inputDestination = form.querySelector("#destination");
    let inputName = form.querySelector("#name");
    let inputPax = form.querySelector("#pax");
    let inputPrice = form.querySelector("#price");
    let inputImage = form.querySelector("#image");

    let inputArray = [inputDestination, inputName, inputPax, inputPrice, inputImage];

    let errorDestination = form.querySelector(".msg-error-destination");
    let errorName = form.querySelector(".msg-error-name");
    let errorPax = form.querySelector(".msg-error-pax");
    let errorPrice = form.querySelector(".msg-error-price");
    let errorImage = form.querySelector(".msg-error-image");

    let errorArray = [errorDestination, errorName, errorPax, errorPrice, errorImage];

    const errorReset = () => {
        errorArray.forEach(msg => {
            msg.innerHTML = "";
        });
    }

    const validate = e => {
        // Inicializar asumiendo que no hay errores.
        let hasErrors = false;
        errorReset();

        if(!inputDestination.value){
            hasErrors = true;
            errorDestination.innerText = "Por favor ingrese un destino valido";
        }

        if(!inputName.value){
            hasErrors = true;
            errorName.innerText = "Por favor ingrese el tipo de domo";
        }

        if(!inputPax.value){
            hasErrors = true;
            errorPax.innerText = "Por favor ingrese la cantidad de pasajeros";
        }
        if(!inputPrice.value){
            hasErrors = true;
            errorPrice.innerText = "Por favor ingrese el precio";
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