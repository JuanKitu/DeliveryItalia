'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/const');

module.exports = {
    /**
     * @description Crea el token de seguridad para realizar acciones que lo necesiten
     * @param {string} user Nombre de usuario
     * @returns {string} Token de seguridad
     */
    createToken: function (id, pwd) {
        const payload = {
            sub: id,
            pwd: pwd,
            iat: moment().unix()
        };

        return jwt.sign(payload, config.JWT_SECRET_KEY);
    },
    /**
     * @description Decodifica el token de seguridad
     * @param {string} Token a decodificar
     * @returns {JSON} Token decodificado en formato JSON
     */
    unToken: async function (token) {
        return jwt.verify(token, config.JWT_SECRET_KEY, (err, result) => { 
            if (err) { 
                return false; 
            }else {
                if(result.iat){
                    const payload = {
                        sub: result.sub,
                        pwd: result.pwd,
                        iat: moment().unix()
                    };
                    return {payload: payload, newAutorization: jwt.sign(payload, config.JWT_SECRET_KEY)};
                }else{
                    return false;
                }
            };
        });
    }
};