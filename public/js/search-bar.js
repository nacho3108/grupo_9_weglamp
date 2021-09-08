
window.addEventListener("load", () => {
    
    const destinos = [
    {nombre: "patagonia"},
    {nombre: "tigre"},
    {nombre: "lobos"},
]
const form = document.querySelector("form");
const destination = document.querySelector("destino");
const search = document.querySelector("#search");
const resultado = document.querySelector("#resultado")
const filter = () => {

/*console.log(form.value);*/
resultado.innerHTML ="";
const texto = destino.value.toLowerCase()

for(let destino of destinos){
let domo = destino.nombre.toLowerCase();
if(domo.indexOf(texto)!== -1){
resultado.innerHTML += destino.nombre
}

}
if(resultado.innerHTML === ""){
resultado.innerHTML += "destino no encontrado..."
}
}
form.addEventListener("submit", e => {
e.preventDefault()
filter()
})
});