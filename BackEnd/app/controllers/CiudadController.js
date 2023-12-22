const Ciudad= require('../model/Ciudad');

class CiudadController{
    async listar(req, res){

        res.json(await Ciudad.listar());
    };
}

module.exports=  new CiudadController;
