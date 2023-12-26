const Usuario= require('../model/Usuario');

class UsuarioController{
    async guardar(req, res){
        const body= req.body;

        let fechaNacimientoUsuarioDate= new Date(body.fechaNacimientoUsuario).getFullYear();
        let fechaActual= new Date().getFullYear();
        let edadUsuario= fechaActual - fechaNacimientoUsuarioDate;

        let viabilidad=0
        let estadoUsuario= 1

        if (edadUsuario >= 18 && edadUsuario<=65 ) {
            viabilidad= viabilidad+1;
        } 

        const usuario = new Usuario(body.numeroDocumentoUsuario, body.nombresUsuario, body.apellidosUsuario, body.idCiudadFKUsuario, body.fechaNacimientoUsuario, body.emailUsuario, edadUsuario, body.telefonoUsuario, estadoUsuario, viabilidad, body.idOcupacionFKUsuario);
        const res_guardar= await usuario.guardar();
        

        res.json(res_guardar);
    };

    async actualizar(req, res){
        const body= req.body;


        let fechaNacimientoUsuarioDate= new Date(body.fechaNacimientoUsuario).getFullYear();
        let fechaActual= new Date().getFullYear();
        let edadUsuario= fechaActual - fechaNacimientoUsuarioDate;

        let viabilidad=0

        if (edadUsuario >= 18 && edadUsuario<=65 ) {
            viabilidad= viabilidad+1;
        } 

        const usuario = new Usuario(req.params.nro_documento, body.nombresUsuario, body.apellidosUsuario, body.idCiudadFKUsuario, body.fechaNacimientoUsuario, body.emailUsuario, edadUsuario, body.telefonoUsuario, body.estadoUsuario, viabilidad,  body.idOcupacionFKUsuario);
        const res_actualizar= await usuario.actualizar();
        

        res.json(res_actualizar);
    };

    async cambiarEstado(req, res){
        let nro_documento= req.params.nro_documento;
        let datos= await Usuario.listar(nro_documento)
        console.log(datos.resultado[0].estadoUsuario)
        res.json(await Usuario.cambiarEstado(nro_documento,datos.resultado[0].estadoUsuario))
    };

    async listar(req, res){

        let  nro_documento = req.params.nro_documento;

        nro_documento= !nro_documento ? '': nro_documento;

        console.log(nro_documento);

        res.json(await Usuario.listar(nro_documento));
    };
}

module.exports=  new UsuarioController;