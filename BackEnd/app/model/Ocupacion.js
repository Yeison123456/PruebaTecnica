const db= require('../src/db')

class ocupacion{
    constructor(ocupacion  , estadoOcupacion   ){
        this.ocupacion = ocupacion;
        this.estadoOcupacion  = estadoOcupacion ;
    }

    static async listar(){
        const query=`Select * from ocupaciones; `;

        return await db.listar(query, true);
    }
}

module.exports = ocupacion