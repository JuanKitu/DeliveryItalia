CREATE TABLE apodos (
    "idNombreCalle" serial NOT NULL,
    "nombreCalle" VARCHAR(100) NOT NULL,
    "idCalle" INT NOT NULL,
    PRIMARY KEY("idNombreCalle","idCalle"),
    FOREIGN key("idCalle") REFERENCES calles
);
-- si no se pone las "" pgadmin toma automaticamente la cadena de texto totalmente en minusculas
CREATE TABLE producto(
    "idProducto" serial NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio real NOT NULL,
    PRIMARY KEY("idProducto")
);

CREATE TABLE "categoriaGusto"(
    "idCategoria" serial NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY("idCategoria")
);

CREATE TABLE gustos(
    "idGusto" SERIAL NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    disponible BOOLEAN,
    "idCategoria" INT,
    PRIMARY KEY ("idGusto"),
    FOREIGN KEY ("idCategoria") REFERENCES "categoriaGusto"
);

CREATE TABLE sucursales(
    "idSucursal" serial NOT NULL,
    "numeroTelefono" INT,
    direccion VARCHAR(100) NOT NULL,
    nombre VARCHAR(50),
    PRIMARY KEY("idSucursal")
);

CREATE TABLE cuentas(
    "idCuenta" SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    salt VARCHAR,
    "userType" INT NOT NULL,
    PRIMARY KEY("idCuenta")
);

CREATE TABLE clientes(
    "idCliente" serial NOT NULL,
    dni INT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    "idCuenta" INT NOT NULL,
    PRIMARY KEY("idCliente"),
    FOREIGN KEY("idCuenta") REFERENCES cuenta
);

CREATE TABLE calles(
    "idCalle" serial NOT NULL,
    "nombreFormal" VARCHAR(100) NOT NULL,
    PRIMARY KEY("idCalle"),
);

CREATE TABLE domicilios(
    "idDomicilio" SERIAL NOT NULL,
    "idCalle" INT NOT NULL,
    "idCliente" INT NOT NULL
    numero INT NOT NULL,
    piso VARCHAR(50),
    "nroDepto" VARCHAR(10),
    referencias TEXT,
    "entreCalles" TEXT,
    PRIMARY KEY("idDomicilio"),
    FOREIGN KEY("idCalle") REFERENCES calles,
    FOREIGN KEY("idCliente") REFERENCES clientes
);

CREATE TABLE potes(
    "idPote" serial,
    tamanio REAL,
    cantidad INT DEFAULT 1,
    PRIMARY KEY("idPote")
);

CREATE TABLE "gustosEnPotes"(
    --gusto de potes muchos a muchos(rel)
    "idPote" int NOT NULL,
    "idGusto" int NOT NULL,
    "vecesUsado" INT DEFAULT 1,
    PRIMARY KEY("idPote", "idGusto"),
    FOREIGN KEY("idPote") REFERENCES potes,
    FOREIGN KEY("idGusto") REFERENCES gustos
);

CREATE TABLE pedidos (
    "idPedido" SERIAL not null,
    "fechaPedido" TIMESTAMP WITH TIME ZONE not null,
    "montoTotal" REAL,
    cuit BIGINT,
    "idDomicilio" INT,
    "idCliente" INT,
    "idSucursal" INT,
    "idMedioPago" INT,
    descripcion TEXT,
    FOREIGN KEY("idCliente") REFERENCES clientes,
    FOREIGN KEY("idDomicilio") REFERENCES domicilios,
    FOREIGN KEY("idSucursal") REFERENCES sucursales,
    FOREIGN KEY("idMedioPago") REFERENCES "medioPago"
    PRIMARY KEY("idPedido")
);

CREATE TABLE "itemPedido"(
    "idItemPedido" serial NOT NULL,
    "idPedido" int NOT NULL,
    "precioTotal" REAL,
    cantidad INT,
    "idPote" INT,
    "idProducto" INT,
    descripcion TEXT,
    PRIMARY KEY("idItemPedido", "idPedido"),
    FOREIGN KEY("idPote") REFERENCES potes,
    FOREIGN KEY("idProducto") REFERENCES producto,
    FOREIGN KEY("idPedido") REFERENCES pedidos
);

CREATE TABLE "estadoPedido"(
    "idEstado" SERIAL NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    "fechaInicioEstado" TIMESTAMP WITH TIME ZONE NOT NULL,
    "fechaFinEstado" TIMESTAMP WITH TIME ZONE,
    descripcion TEXT,
    "idPedido" int NOT NULL,
    PRIMARY KEY("idEstado", "idPedido"),
    FOREIGN KEY("idPedido") REFERENCES pedidos
);

CREATE TABLE "medioPago"(
    "idMedioPago" SERIAL NOT NULL,
    descripcion TEXT,
    "nombreMedioPago" VARCHAR(50),
    PRIMARY KEY ("idMedioPago")
);
CREATE TABLE "precioDelivery"(
    "idPrecioDelivery" SERIAL NOT NULL,
    "idSucursal" INT NOT NULL,
    nombre VARCHAR(50),
    "precioDelivery" REAL,
    PRIMARY KEY("idPrecioDelivery","idSucursal"),
    FOREIGN KEY("idSucursal") REFERENCES sucursales
);

--######## constantes para el programa ########
CREATE TABLE constante_pote(
    "idConstantePote" SERIAL NOT NULL,
    weight REAL,
    price REAL,
    "maxQuantity" INT,
    PRIMARY KEY ("idConstantePote")   
);


--#############################################