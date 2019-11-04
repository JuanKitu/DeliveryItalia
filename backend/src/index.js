//ayu dark theme
const express = require('express');
const {json} =require('express');
const morgan = require('morgan');
colors = require('colors');
const app = express();

/*--- Settings ---*/
app.set('json spaces',2);
app.set('port',3000);
/*--- importing routes ---*/
const productosRoutes = require('./routes/productos.js');
/*--- middleware ---*/
app.use(morgan('dev'));
app.use(json());
/*--- Routes ---*/
app.use('/api/productos',productosRoutes);
/*--- Starup ---*/
app.listen(app.get('port'),()=>{
    console.log(`Server on port: ${app.get('port')}`.magenta);
});