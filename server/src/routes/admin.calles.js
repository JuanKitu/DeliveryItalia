const {Router} = require('express');
const router = Router();
const controller = require('../controllers/calles.controller.js');

router.get('/',controller.getAll);
router.get('/:idCalle',controller.getById);
router.post('/',controller.new);
router.delete('/:idCalle',controller.delete);
router.put('/:idCalle',controller.change);
router.get('/:idCalle/apodos',controller.getApodos);
router.get('/:idCalle/domicilios',controller.getDomicilios);

module.exports = router;