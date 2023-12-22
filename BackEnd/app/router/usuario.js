var router=require('express').Router();
var UsuarioController = require('../controllers/UsuarioController');

router.post('/', UsuarioController.guardar);
router.get('/', UsuarioController.listar);
router.get('/:nro_documento', UsuarioController.listar);
router.delete('/:nro_documento', UsuarioController.cambiarEstado);
router.put('/:nro_documento', UsuarioController.actualizar);

module.exports=router;
