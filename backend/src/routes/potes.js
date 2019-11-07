const {Router} = require('express');
const router = Router();
const controller = require('../controllers/potes.controller.js');


router.get('/',controller.getAll);
router.get('/:idPote',controller.getById);
router.post('/',controller.new);
router.post('/:idPote/gusto',controller.addGusto);
router.get('/:idPote/gusto',controller.getGustos);
router.post('/',controller.new);
router.delete('/:idPote',controller.delete);
router.put('/:idPote',controller.change);;


module.exports = router;