var router=require('express').Router();
var CiudadController = require('../controllers/CiudadController');

router.get('/', CiudadController.listar);


module.exports=router;