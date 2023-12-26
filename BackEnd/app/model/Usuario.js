const db= require('../src/db')

class usuario{
    constructor(numeroDocumentoUsuario, nombresUsuario , apellidosUsuario , idCiudadFKUsuario , fechaNacimientoUsuario , emailUsuario , edadUsuario , telefonoUsuario , estadoUsuario , viabilidad, idOcupacionFKUsuario ){
        this.numeroDocumentoUsuario = numeroDocumentoUsuario;
        this.nombresUsuario = nombresUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.idCiudadFKUsuario = idCiudadFKUsuario;
        this.estadoUsuario = estadoUsuario;
        this.idOcupacionFKUsuario= idOcupacionFKUsuario;
        this.emailUsuario= emailUsuario;
        this.edadUsuario= edadUsuario;
        this.telefonoUsuario= telefonoUsuario;
        this.viabilidad= viabilidad,
        this.fechaNacimientoUsuario= fechaNacimientoUsuario;
    }


    async guardar(){
        const query= `
        insert into usuario values
        (
        '${this.numeroDocumentoUsuario}',
        '${this.nombresUsuario}' ,
        '${this.apellidosUsuario }', 
        '${this.idCiudadFKUsuario}' , 
        '${this.fechaNacimientoUsuario}' ,
        '${this.emailUsuario}' ,
        '${this.edadUsuario}' , 
        '${this.telefonoUsuario}' , 
        '${this.estadoUsuario} ', 
        '${this.viabilidad}',
        '${this.idOcupacionFKUsuario}'
        );
        `;

        return await db.ejecutar(query);
    }

    async actualizar(){
        const query= `
        update usuario set nombresUsuario='${this.nombresUsuario}',
        apellidosUsuario='${this.apellidosUsuario}', 
        idCiudadFKUsuario='${this.idCiudadFKUsuario}', 
        fechaNacimientoUsuario='${this.fechaNacimientoUsuario}', 
        emailUsuario='${this.emailUsuario}', 
        edadUsuario='${this.edadUsuario}', 
        telefonoUsuario='${this.telefonoUsuario}', 
        estadoUsuario='${this.estadoUsuario}', 
        viabilidad='${this.viabilidad}', 
        idOcupacionFKUsuario='${this.idOcupacionFKUsuario}'
        where numeroDocumentoUsuario='${this.numeroDocumentoUsuario}';
        `;

        return await db.ejecutar(query);
    }

    static async cambiarEstado(nro_documento, estadoUsuario){
        const estadoUsuarioNew= estadoUsuario ===0 ? 1 : 0
        console.log(estadoUsuarioNew)
        const query=`update usuario set estadoUsuario=${estadoUsuarioNew} where numeroDocumentoUsuario='${nro_documento}'; `;

        return await db.cambiarEstado(query);
    }

    static async listar(nro_documento){
        const query=`Select numeroDocumentoUsuario, nombresUsuario, apellidosUsuario, nombreCiudad as idCiudadFKUsuario, idCiudad , DATE_FORMAT(fechaNacimientoUsuario, "%d/%m/%Y") AS fechaNacimientoUsuario, emailUsuario, edadUsuario, telefonoUsuario, estadoUsuario,viabilidad, ocupacion as idOcupacionFKUsuario, idOcupacion from usuario inner join ocupaciones on usuario.idOcupacionFKUsuario=ocupaciones.idOcupacion inner join ciudades on usuario.idCiudadFKUsuario=ciudades.idCiudad where numeroDocumentoUsuario like '%${nro_documento}'; `;

        return await db.listar(query, true);
    }
}

module.exports = usuario