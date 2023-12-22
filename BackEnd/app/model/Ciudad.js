const db= require('../src/db')

class ciudad{
    constructor(nombreCiudad , estadoCiudad  ){
        this.nombreCiudad = nombreCiudad;
        this.estadoCiudad = estadoCiudad;
    }

    static async listar(){
        const query=`Select * from ciudades; `;

        return await db.listar(query, true);
    }
}

module.exports = ciudad