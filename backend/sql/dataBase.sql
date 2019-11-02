CREATE TABLE apodos (
    idNombreCalle serial NOT NULL,
    nombreCalle VARCHAR(100) NOT NULL,
    PRIMARY KEY(idNombreCalle)
);

CREATE TABLE producto(
    idProducto serial NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precios real NOT NULL,
    PRIMARY KEY(idProducto)
);

CREATE TABLE categoriaGusto(
    idCategoria serial NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY(idCategoria)
);

CREATE TABLE gustos(
    idGusto SERIAL NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    disponible BOOLEAN,
    idCategoria INT,
    PRIMARY KEY (idGusto),
    FOREIGN KEY (idCategoria) REFERENCES categoriaGusto
);

CREATE TABLE sucursales(
    idSucursal serial NOT NULL,
    numeroTelefono INT,
    direccion VARCHAR(100) NOT NULL,
    PRIMARY KEY(idSucursal)
);

CREATE TABLE personas(
    dni INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    PRIMARY KEY(dni)
);

CREATE TABLE calles(
    idCalle serial NOT NULL,
    apodos VARCHAR(100),
    nombreFormal VARCHAR(100) NOT NULL,
    idNombreCalle iNT NOT NULL,
    PRIMARY KEY(idCalle),
    FOREIGN KEY (idNombreCalle) REFERENCES apodos
);

CREATE TABLE clientes(
    idCliente serial NOT NULL,
    dni INT,
    PRIMARY KEY(idCliente),
    FOREIGN KEY(dni) REFERENCES personas
);

CREATE TABLE domicilios(
    idDomicilio SERIAL NOT NULL,
    numero INT NOT NULL,
    piso VARCHAR(50),
    nroDept VARCHAR(10),
    referencias TEXT,
    entreCalles TEXT,
    PRIMARY KEY(idDomicilio)
);

CREATE TABLE domicilioPertCalle(
    --que domicilio pertenece a que calle
    idCalle INT NOT NULL,
    idDomicilio INT,
    PRIMARY KEY(idCalle, idDomicilio),
    FOREIGN KEY(idCalle) REFERENCES calles,
    FOREIGN kEY(idDomicilio) REFERENCES domicilios
);

CREATE TABLE clienteEnDOmicilios(
    --que cliente se encuentra en que domicilio
    idCliente int NOT NULL,
    idDomicilio INT,
    PRIMARY KEY(idCliente, idDomicilio),
    FOREIGN KEY(idCliente) REFERENCES clientes,
    FOREIGN KEY(idDomicilio) REFERENCES domicilios
);

CREATE TABLE potes(
    idPote serial,
    cantidad int NOT NULL,
    PRIMARY KEY(idPote)
);

CREATE TABLE gustosEnPotes(
    --gusto de potes muchos a muchos(rel)
    idPote int NOT NULL,
    idGusto int NOT NULL,
    PRIMARY KEY(idPote, idGusto),
    FOREIGN KEY(idPote) REFERENCES potes,
    FOREIGN KEY(idGusto) REFERENCES gustos
);

CREATE TABLE pedidos (
    idPedido serial not null,
    fechaPedido DATE not null,
    horaPedido TIME,
    montoTotal real not null,
    montoPagaCliente real not null,
    cuit int,
    idDomicilio INT,
    idCliente INT,
    descripcion TEXT,
    idSucursal INT,
    FOREIGN KEY(idCliente) REFERENCES clientes,
    FOREIGN KEY(idDomicilio) REFERENCES domicilios,
    FOREIGN KEY(idSucursal) REFERENCES sucursales,
    PRIMARY KEY(idPedido)
);

CREATE TABLE itemPedido(
    id serial NOT NULL,
    precioTotal real NOT NULL,
    cantidad int NOT NULL,
    idPote int NOT NULL,
    idProducto int NOT NULL,
    idPedido int NOT NULL,
    descripcion TEXT,
    PRIMARY KEY(id, idPedido),
    FOREIGN KEY(idPote) REFERENCES potes,
    FOREIGN KEY(idProducto) REFERENCES producto,
    FOREIGN KEY(idPedido) REFERENCES pedidos
);

CREATE TABLE estadoPedido(
    idEstado serial NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    fechaInicioEstado timestamp NOT NULL,
    fechaFinEstado timestamp NOT NULL,
    descripcion TEXT,
    idPedido int NOT NULL,
    PRIMARY KEY(idEstado, idPedido),
    FOREIGN KEY(idPedido) REFERENCES pedidos
);