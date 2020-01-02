"use strict";
const config = require('../config/const');
const services = require('../services/token');
const Cuentas = require('../models/Cuentas');
/**
 * @description se encarga de verificar si se tiene permiso para entrar a una ruta dada
 */
module.exports = async function (req, res, next) {
    const route = req.path;

    // Verificamos si es una ruta publica.
    if (config.ROUTES_PUBLIC.some(common => route.indexOf(common) === 0)) {
        console.log('ruta publica');
        return next();
    }

    // Obtenemos la autorizacion para ver si tiene permiso de acceso.
    let autorization = req.cookies.autorization;
    if (!autorization) {
        return res.send({ err: 'por favor logea' });
    }

    let { payload, newAutorization } = await services.unToken(autorization);

    req.payload = payload;

    // Verificamos si es un token valido
    if (!payload) {
        res.clearCookie("autorization");
        return res.send('la sesion caduco');
    }

    res.cookie('autorization', newAutorization);
    let cuenta = await Cuentas.findOne({ where: { idCuenta: payload.sub } });

    // Verificamos si es una ruta para admines.
    if (config.ROUTES_ADMIN.some(common => route.indexOf(common) === 0)) {
        console.log('ruta admin');
        if (cuenta.userType > 1) {
            return next();
        } else {
            return res.send('no tiene permiso para estar aqui');
        }
    }
    return next();
};