//ayu dark theme
const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
colors = require('colors');
const app = express();

/*--- Settings ---*/
console.log(new Date());
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 2);
app.set('port', 3000);
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
const AuthToken = require('./middleware/authToken');
const adminApodosRoutes = require('./routes/admin.apodos.js');
const adminCallesRoutes = require('./routes/admin.calles.js');
const adminCategoriaGustosRoutes = require('./routes/admin.categoriaGusto.js');
const adminClientesRoutes = require('./routes/admin.clientes.js');
const adminCuentasRoutes = require('./routes/admin.cuentas.js');
const adminDomiciliosRoutes = require('./routes/admin.domicilios.js');
const adminEstadosPedidosRoutes = require('./routes/admin.estadoPedidos.js');
const adminGustosRoutes = require('./routes/admin.gustos.js');
const adminMedioPagoRoutes = require('./routes/admin.medioPago.js');
const adminPedidosRoutes = require('./routes/admin.pedidos.js');
const adminPotesRoutes = require('./routes/admin.potes.js');
const adminProductosRoutes = require('./routes/admin.productos');
const adminSucursalesRoutes = require('./routes/admin.sucursales.js');
/*--- middleware ---*/
app.use(morgan('dev'));
app.use(json());
app.use(AuthToken);

// Configurar cabeceras y cors
const corsOptions = {
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions))


/*--- Routes ---*/

/*######################################## User Routes ########################################*/

app.use('/api/apodos', apodosRoutes);
app.use('/api/calles', callesRoutes);
app.use('/api/categoriagustos', categoriaGustoRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/cuentas', cuentasRoutes);
app.use('/api/domicilios', domiciliosRoutes);
//app.use('/api/estadopedidos',estadosPedidosRoutes);
app.use('/api/gustos', gustosRoutes);
app.use('/api/mediopagos', medioPagosRoutes);
app.use('/api/pedidos', pedidosRoutes); //FALTA REVISAR LOS PERMISOS
app.use('/api/potes', potesRoutes); //FALTA REVISAR LOS PERMISOS
app.use('/api/productos', productosRoutes);
app.use('/api/sucursales', sucursalesRuotes);


app.use('/api/constante/potes', constante_potesRoutes);
/*####################################### Admin Routes ########################################*/
app.use('/api/admin/apodos', adminApodosRoutes);
app.use('/api/admin/calles', adminCallesRoutes);
app.use('/api/admin/categoriagustos', adminCategoriaGustosRoutes);
app.use('/api/admin/clientes', adminClientesRoutes);
app.use('/api/admin/cuentas', adminCuentasRoutes);
app.use('/api/admin/domicilios', adminDomiciliosRoutes);
app.use('/api/admin/estadopedidos', adminEstadosPedidosRoutes);
app.use('/api/admin/gustos', adminGustosRoutes);
app.use('/api/admin/mediopagos', adminMedioPagoRoutes);
app.use('/api/admin/pedidos', adminPedidosRoutes);
app.use('/api/admin/pedidos', adminPotesRoutes);
app.use('/api/admin/productos', adminProductosRoutes);
app.use('/api/sucursales', adminSucursalesRoutes);
/*#############################################################################################*/
/*--- Starup ---*/
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`.magenta);
});