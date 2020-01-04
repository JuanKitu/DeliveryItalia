const {Router} = require('express');
const router = Router();
const controller = require('../controllers/potes.controller.js');


router.get('/',controller.getAll);
router.get('/:idPote',controller.getById);
//router.delete('/:idPote',controller.delete);
router.put('/:idPote',controller.change);;
/*--- about a specific pot taste ---*/
router.get('/:idPote/gustos',controller.getGustos);
router.get('/:idPote/gustos/:idGusto',controller.getGustoEnPotes);
router.post('/:idPote/gustos',controller.addGusto);
router.delete('/:idPote/gustos/:idGusto',controller.deleteGusto);

module.exports = router;