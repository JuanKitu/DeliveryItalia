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

/*--- middleware ---*/
app.use(morgan('dev'));
app.use(json());
/*--- Routes ---*/

/*--- Starup ---*/
app.listen(app.get('port'),()=>{
    console.log(`Server on port: ${app.get('port')}`.magenta);
});