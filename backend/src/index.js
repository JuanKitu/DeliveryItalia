//ayu dark theme
const express = require('express');
const {json} =require('express');
const morgan = require('morgan');
const path = require('path');
colors = require('colors');
const app = express();

/*--- Settings ---*/
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces',2);
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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
/*--- middleware ---*/
app.use(morgan('dev'));
app.use(json());
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
/*--- Starup ---*/
app.listen(app.get('port'),()=>{
    console.log(`Server on port: ${app.get('port')}`.magenta);
});