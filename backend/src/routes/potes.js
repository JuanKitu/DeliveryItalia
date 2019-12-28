const {Router} = require('express');
const router = Router();
const controller = require('../controllers/potes.controller.js');


router.get('/',controller.getAll);
router.get('/:idPote',controller.getById);
router.post('/',controller.new);
router.delete('/:idPote',controller.delete);
router.put('/:idPote',controller.change);;
/*--- about a specific pot taste ---*/
router.get('/:idPote/gustos',controller.getGustos);
router.post('/:idPote/gustos',controller.addGusto);
router.delete('/:idPote/gustos',controller.deleteGusto);

module.exports = router;