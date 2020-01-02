//ayu dark theme
const express = require('express');
const {json} =require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
colors = require('colors');
const app = express();

/*--- Settings ---*/
console.log(new Date().toString());
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces',2);
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('process', process);
app.use(cookieParser());
process.env.TZ = 'UTC-3';

/*--- importing routes ---*/
const productosRoutes = require('./routes/productos.js');
const categoriaGustoRoutes = require('./routes/categoriaGusto.js');
const gustosRoutes = require('./routes/gustos.js');
const potesRoutes = require('./routes/potes.js');
const sucursalesRuotes = require('./routes/sucursales.js');
const callesRoutes = require('./routes/calles.js');
const apodosRoutes = require('./routes/apodos.js');
const domiciliosRoutes = require('./routes/domicilios.js');
const clientesRoutes = require('./routes/clientes.js');
const pedidosRoutes = require('./routes/pedidos.js');
const estadosPedidosRoutes = require('./routes/estadoPedidos.js')
const medioPagosRoutes = require('./routes/medioPago.js');
const cuentasRoutes = require('./routes/cuentas.js');
const constante_potesRoutes = require('./routes/constante_pote.js')
const usuariosRoutes = require('./routes/usuarios.js');
const AuthToken = require('./middleware/authToken');
/*--- middleware ---*/
app.use(morgan('dev'));
app.use(json());
app.use(AuthToken);
/*--- Routes ---*/
app.use('/api/productos',productosRoutes);
app.use('/api/categoriagustos',categoriaGustoRoutes);
app.use('/api/gustos',gustosRoutes);
app.use('/api/potes',potesRoutes);
app.use('/api/sucursales',sucursalesRuotes);
app.use('/api/calles',callesRoutes);
app.use('/api/apodos',apodosRoutes);
app.use('/api/domicilios',domiciliosRoutes);
app.use('/api/clientes',clientesRoutes);
app.use('/api/pedidos',pedidosRoutes);
app.use('/api/estadopedidos',estadosPedidosRoutes);
app.use('/api/mediopagos',medioPagosRoutes);
app.use('/api/cuentas',cuentasRoutes);
app.use('/api/usuarios',usuariosRoutes);
app.use('/api/constante/potes',constante_potesRoutes);

/*--- Starup ---*/
app.listen(app.get('port'),()=>{
    console.log(`Server on port: ${app.get('port')}`.magenta);
});