const {Router} = require('express');
const router = Router();
const controller = require('../controllers/calles.controller.js');

router.get('/',controller.getAll);
router.get('/:idCalle',controller.getById);
router.get('/:idCalle/apodos',controller.getApodos);

module.exports = router;