var router= require('express').Router();

var router_usuario= require('./usuario');
var router_ciudad= require('./Ciudad');
var router_ocupacion= require('./Ocupacion');

router.use('/usuario', router_usuario);
router.use('/ciudad', router_ciudad);
router.use('/ocupacion', router_ocupacion);


module.exports= router;