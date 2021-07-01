
const fs = require('fs');
const path = require('path')

module.exports = {
    
    readFile(){
       return JSON.parse(fs.readFileSync(this.filename)) 
    },
    
    filename: path.resolve(__dirname, '../data/register.JSON'),



    create(regist) {
        regist.id = this.generateId();
        const register = this.readFile();
        const registersUpdated = [...register, regist];
        this.writeFile(registersUpdated);
        return regist;
    },
    generateId() {
        const register = this.readFile();
        const lastRegist = register.pop();
        return lastRegist.id + 1;
    },
    writeFile(newRegister){
       // convertir el array que te llega como parametro a JSON
       const json = JSON.stringify(newRegister, null , 2) 

       // reescribir el archivo .JSON
       fs.writeFileSync(this.filename, json);
    },
    findByField(field, value) {
        const users = this.readFile();
        // Filtrar por el [field]

        // [] los usamos para que sea dinámica el nombre de la propiedad
        const userFound = users.find(user => user[field] == value);
        // Devolvemos el user
        return userFound;
    },
    findAll() {
        // Leer nuestra informacion
        const users = this.readFile();
        // devolver la info
        return users;
    },
    findByPk(id) {
        const users = this.readFile();
        // Filtrar por el ID
        const userFound = users.find(user => user.id == id);
        // Devolvemos el user
        return userFound;
    },
    
    

}


    
