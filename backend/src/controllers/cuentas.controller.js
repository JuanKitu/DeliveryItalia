const crypto = require('crypto');
const services = require('../services/token');
const Cuentas = require('../models/Cuentas');

const controller = {};
/*--- Create a Cuenta ---*/
controller.new = async(req, res) => {

    const { email, password } = req.body;

    try {
        let salt = crypto.randomBytes(128).toString("base64");
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', async(err, derivedKey) => {
            if (err) throw err;
            let cuenta = await Cuentas.create({
                email,
                password: derivedKey.toString('hex'),
                salt,
                userType: 1
            });

            let token = services.createToken(cuenta.idCuenta, cuenta.password);

            return res.cookie('autorization', token).send({ data: 'ok' });
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query a Cuenta ---*/
controller.getAll = async(req, res) => {
    const idCuenta = req.payload.sub;
    try {
        cuentas = await Cuentas.findAll({
            where: {
                idCuenta
            }
        });
        return res.json({
            data: cuentas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a Cuenta ---*/
controller.change = async(req, res) => {
    const idCuenta = req.payload.sub;
    const { password } = req.body;
    try {
        let salt = crypto.randomBytes(128).toString("base64");
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', async(err, derivedKey) => {
            if (err) throw err;
            await Cuentas.update({
                salt,
                password: derivedKey.toString('hex')
            }, {
                where: { idCuenta }
            });
            const cuentas = await Cuentas.findOne({
                where: {
                    idCuenta
                }
            });

            let token = services.createToken(cuentas.idCuenta, cuentas.password);

            return res.cookie('autorization', token).json({
                message: 'The Cuenta has been changed',
                data: cuentas
            });;
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a Cuenta ---*/
controller.delete = async(req, res) => {
    try {
        const idCuenta = req.payload.sub;
        const deleteRowCount = await Cuentas.destroy({
            where: {
                idCuenta
            }
        });
        return res.json({
            message: 'The Cuenta has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a Cuenta ---*/
controller.getById = async(req, res) => {
    const idCuenta = req.payload.sub;
    try {
        cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        return res.json({
            data: cuenta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ Admin Cuentas API REST ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/
/*--- Query a Cuenta ---*/
controller.adminGetAll = async(req, res) => {
    try {
        cuentas = await Cuentas.findAll();
        return res.json({
            data: cuentas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a Cuenta ---*/
controller.adminChange = async(req, res) => {
    const { idCuenta } = req.params;
    const { email, password } = req.body;
    try {
        await Cuentas.update({
            email,
            password
        }, {
            where: {
                idCuenta
            },
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        return res.json({
            message: 'The Cuenta has been changed',
            data: cuentas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a Cuenta ---*/
controller.adminDelete = async(req, res) => {
    try {
        const { idCuenta } = req.params;
        const deleteRowCount = await Cuentas.destroy({
            where: {
                idCuenta
            }
        });
        return res.json({
            message: 'The Cuenta has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a Cuenta ---*/
controller.adminGetById = async(req, res) => {
    const { idCuenta } = req.params;
    try {
        cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        return res.json({
            data: cuenta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/
controller.login = async(req, res) => {

    const { email, password } = req.body;

    let cuenta = await Cuentas.findOne({ where: { email } });
    if (cuenta) {
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
    } else {
        return res.send({
            login: "usuario desconocido"
        });
    }
};

controller.register = (req, res) => {

    const { email, password } = req.body;

    let salt = crypto.randomBytes(128).toString("base64");
    crypto.pbkdf2(password, salt, 100, 64, 'sha512', async(err, derivedKey) => {
        if (err) throw err;
        let cuenta = await Cuentas.create({
            email,
            password: derivedKey.toString('hex'),
            salt,
            userType: 1
        });

        let token = services.createToken(cuenta.idCuenta, cuenta.password);

        return res.cookie('autorization', token).send({ data: 'ok' });
    });
};
controller.logout = (req, res) => {
    res.clearCookie("autorization");
    res.send({ msg: 'success' });
};





module.exports = controller;