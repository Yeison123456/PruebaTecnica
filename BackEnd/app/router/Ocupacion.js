var router=require('express').Router();
var OcupacionController = require('../controllers/OcupacionController');

router.get('/',OcupacionController.listar);


module.exports=router;