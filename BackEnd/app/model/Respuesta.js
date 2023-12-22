class Respuesta{
    constructor(exito, estado, mensaje, resultado){
        this.exito=exito;
        this.estado=estado;
        this.resultado=resultado;
        this.mensaje=mensaje;
    }
}

module.exports=Respuesta;