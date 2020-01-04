const {Router} = require('express');
const router = Router();
const controller = require('../controllers/apodos.controller.js');

router.get('/',controller.getAll);
router.get('/:idNombreCalle',controller.getById);

module.exports=router;