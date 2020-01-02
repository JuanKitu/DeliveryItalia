const {Router} = require('express');
const router = Router();
const controller = require('../controllers/usuarios.controller.js');

router.post('/registrar',controller.register);
router.get('/login',controller.login);
router.get('/logout',controller.logout);

module.exports=router;