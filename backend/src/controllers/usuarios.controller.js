const crypto = require('crypto');
const services = require('../services/token');
const Cuentas = require('../models/Cuentas');
const controller = {};

controller.login = async (req, res) => {

    const { email, password } = req.body;

    let cuenta = await Cuentas.findOne({where: {email}});
    if(cuenta){
        crypto.pbkdf2(password, cuenta.salt, 100, 64, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            if (derivedKey.toString('hex') == cuenta.password) {
                let token = services.createToken(cuenta.idCuenta, cuenta.password);
                return res.cookie('autorization', token).send({
                    login: "ok"
                });
            } else {
                return res.send({
                    login: "contraseña incorrecta"
                });
            }
        });
    }else{
        return res.send({
            login: "usuario desconocido"
        });
    }
};

controller.register = (req, res) => {

    const { email, password } = req.body;

    let salt = crypto.randomBytes(128).toString("base64");
    crypto.pbkdf2(password, salt, 100, 64, 'sha512', async (err, derivedKey) => {
        if (err) throw err;
        let cuenta = await Cuentas.create({
            email,
            password: derivedKey.toString('hex'),
            salt,
            userType: 1
        });

        let token = services.createToken(cuenta.idCuenta, cuenta.password);

        return res.cookie('autorization', token).send({data: 'ok'});
    });
};
controller.logout = (req, res) => {
    res.clearCookie("autorization");
    res.send({ msg: 'success' });
};


module.exports = controller;