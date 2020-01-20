const {Router} = require('express');
const router = Router();
const controller = require('../controllers/potes.controller.js');


router.get('/',controller.adminGetAll);
router.get('/:idPote',controller.adminGetById);
//router.post('/',controller.new);
//router.delete('/:idPote',controller.delete);
router.put('/:idPote',controller.adminChange);;
/*--- about a specific pot taste ---*/
router.get('/:idPote/gustos',controller.adminGetGustos);
router.get('/:idPote/gustos/:idGusto',controller.adminGetGustoEnPotes);
router.post('/:idPote/gustos',controller.adminAddGusto);
router.delete('/:idPote/gustos/:idGusto',controller.adminDeleteGusto);

module.exports = router;