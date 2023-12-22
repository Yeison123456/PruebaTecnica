const Ocupacion= require('../model/Ocupacion');

class OcupacionController{
    async listar(req, res){

        res.json(await Ocupacion.listar());
    };
}

module.exports=  new OcupacionController;