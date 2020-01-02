"use strict";
const config = {
    /* --- ROUTES --- */
    ROUTES_PUBLIC: ['/api/usuarios/login', '/api/usuarios/registrar'],
    ROUTES_ADMIN: ['/api/admin'],
    /* --- JSON WEB TOKEN --- */
    JWT_SECRET_KEY: '1aa23456789a'
};

module.exports = config;