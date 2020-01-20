const controller = {};
const Potes = require('../models/Potes.js');
const GustosEnPotes = require('../models/GustosEnPotes');
const Gustos = require('../models/Gustos.js');
const Clientes = require('../models/Clientes.js');
const Cuentas = require('../models/Cuentas.js');
const Pedidos = require('../models/Pedidos.js');
const ItemPedido = require('../models/ItemPedido.js');
const Constante_pote = require('../models/Constante_pote.js');
/*--- Edit a pote ---*/
controller.change = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote } = req.params;
    const { tamanio, cantidad } = req.body;
    try {

        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const newPote = await Potes.update({
            tamanio,
            cantidad
        },
            {
                where: {
                    idPote
                }
            });
        const pote = await Potes.findOne({
            where: {
                idPote
            }

        });
        return res.json({
            message: 'The pote has been updated',
            data: pote
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };

};
/*--- Delete a pote --- SACO EL DELETE PORQUE SINO ME VUELVO LOCO*/
// controller.delete = async (req, res) => {
//     try {
//         const { idPote } = req.params;

//         const deleteRowCountGusto = await GustosEnPotes.destroy({
//             where: {
//                 idPote
//             }
//         });
//         const deleteRowCountPote = await Potes.destroy({
//             where: {
//                 idPote
//             }
//         });
//         return res.json({
//             message: 'The pote has been deleted',
//             countPote: deleteRowCountPote,
//             countGusto: deleteRowCountGusto
//         });

//     } catch (error) {
//         console.log(error);
//         return res.json({
//             error: 'The server has been error',
//             data: {}
//         });
//     };

// };

/*--- Find a pote ---*/
controller.getById = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote } = req.params;
    try {
        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const pote = await Potes.findOne({
            where: {
                idPote
            }
        });
        return res.json({
            data: pote
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });

    };


};
/*--- find gusto pote ---*/
controller.getGustos = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote } = req.params
    try {
        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const gustosEnPote = await GustosEnPotes.findAll({
            where: {
                idPote
            }
        });
        const gusto = [];
        for (let inc = 0; inc < gustosEnPote.length; inc++) {
            const idGusto = gustosEnPote[inc].idGusto;
            const gustoAux = await Gustos.findOne({
                where: {
                    idGusto
                }
            });
            gusto.push(gustoAux);
        }
        return res.json({
            data: gusto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };
};
controller.getGustoEnPotes = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote, idGusto } = req.params;
    try {
        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const gustoEnPotes = await GustosEnPotes.findOne({
            where: {
                idPote,
                idGusto
            }
        });
        return res.json({
            data: gustoEnPotes
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }
};
/*--- add gusto pote ---*/
controller.addGusto = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote } = req.params;
    const { idGusto } = req.body;
    try {
        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'tamanio']
        });
        const weight = pote.tamanio;
        const constante_pote = await Constante_pote.findOne({
            where: {
                weight
            }
        });
        const cantidadMaxima = constante_pote.maxQuantity;
        if (pote.cantidad < cantidadMaxima) {
            const gustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
            })
            if (gustoEnPote) {
                const addVecesUsado = gustoEnPote.vecesUsado + 1;
                await GustosEnPotes.update({
                    vecesUsado: addVecesUsado,
                },
                    {
                        where: {
                            idGusto,
                            idPote
                        }
                    }
                )
            } else {
                const newGustoEnPote = await GustosEnPotes.create({
                    idGusto,
                    idPote,
                    vecesUsado: 1
                })
            }
            const addCantidad = pote.cantidad + 1;
            await Potes.update({
                cantidad: addCantidad,
            },
                {
                    where: {
                        idPote
                    }
                })
            const consultaGustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            return res.json({
                message: 'The gusto has been asignate by pote',
                data: consultaGustoEnPote
            })
        } else {
            return res.json({
                message: 'the maximum amount of tastes has been reached',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }


};
/*--- delete gusto pote ---*/
controller.deleteGusto = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idPote, idGusto } = req.params;
    try {
        
        /*##################################### Control Permissions Pedidos #####################################*/
        const controlPote = await Potes.findOne({
            where: {
                idPote
            }
        });
        if (!controlPote) {
            return res.json({
                error: 'The Pedido dont exist'
            });
        };
        //todos los pedidos relacionados al pote
        const itemPedidos = await ItemPedido.findAll({
            where: {
                idPote
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const cliente = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        //todos los pedidos del cliente
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        //hacemos la interseccion entre los pedidos de la cuenta y los pedidos de los potes
        let pedidosCuenta = new Set();
        for (let inc = 0; inc < pedidos.length; inc++) {
            const auxIdPedido = pedidos[inc].idPedido
            pedidosCuenta.add(auxIdPedido)
        };
        let pedidosPote = new Set();
        for (let inc = 0; inc < itemPedidos.length; inc++) {
            const auxIdPedido = itemPedidos[inc].idPedido
            pedidosPote.add(auxIdPedido)
        };
        let interseccion = new Set([...pedidosCuenta].filter(x => pedidosPote.has(x)));
        if (!(cuentas.userTipe === 2) && interseccion.size === 0) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'tamanio']
        });
        const weight = pote.tamanio;
        const constante_pote = await Constante_pote.findOne({
            where: {
                weight
            }
        });
        const cantidadMaxima = constante_pote.maxQuantity;
        if (pote.cantidad <= cantidadMaxima) {
            const gustoSeleccionado = await Gustos.findOne({
                where: {
                    idGusto
                },
                attributes: ['idGusto']
            });
            const gustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            if (gustoEnPote && gustoEnPote.vecesUsado > 1) {
                const dissVecesUsado = gustoEnPote.vecesUsado - 1;
                await GustosEnPotes.update({
                    vecesUsado: dissVecesUsado,
                },
                    {
                        where: {
                            idGusto,
                            idPote
                        }
                    }
                )
                const dissCantidad = pote.cantidad - 1;
                await Potes.update({
                    cantidad: dissCantidad,
                },
                    {
                        where: {
                            idPote
                        }
                    })
            } else if (gustoEnPote) {
                const deleteRowCount = await GustosEnPotes.destroy({
                    where: {
                        idGusto,
                        idPote
                    }
                });
                const dissCantidad = pote.cantidad - 1;
                await Potes.update({
                    cantidad: dissCantidad,
                },
                    {
                        where: {
                            idPote
                        }
                    });
                return res.json({
                    message: 'The Gusto has been deleted by pote',
                    countItemPedido: deleteRowCount,
                });
            }
            const consultaGustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            return res.json({
                message: 'The gusto has been deleted by pote',
                data: consultaGustoEnPote
            })
        } else {
            return res.json({
                message: 'There are no gustos to delete',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }


};

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ Admin Potes API REST ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/


/*--- Query of pote ---*/
controller.adminGetAll = async (req, res) => {
    try {
        const pote = await Potes.findAll();
        return res.json({
            data: pote
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit a pote ---*/
controller.adminChange = async (req, res) => {
    try {
        const { idPote } = req.params;
        const { tamanio, cantidad } = req.body;
        const newPote = await Potes.update({
            tamanio,
            cantidad
        },
            {
                where: {
                    idPote
                }
            });
        const pote = await Potes.findOne({
            where: {
                idPote
            }

        });
        return res.json({
            message: 'The pote has been updated',
            data: pote
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };

};
/*--- Find a pote ---*/
controller.adminGetById = async (req, res) => {
    try {
        const { idPote } = req.params;
        const pote = await Potes.findOne({
            where: {
                idPote
            }
        });
        return res.json({
            data: pote
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });

    };


};
/*--- find gusto pote ---*/
controller.adminGetGustos = async (req, res) => {
    try {
        const { idPote } = req.params
        const gustosEnPote = await GustosEnPotes.findAll({
            where: {
                idPote
            }
        });
        const gusto = [];
        for (let inc = 0; inc < gustosEnPote.length; inc++) {
            const idGusto = gustosEnPote[inc].idGusto;
            const gustoAux = await Gustos.findOne({
                where: {
                    idGusto
                }
            });
            gusto.push(gustoAux);
        }
        return res.json({
            data: gusto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };
};
controller.adminGetGustoEnPotes = async (req, res) => {
    const { idPote, idGusto } = req.params;
    try {
        const gustoEnPotes = await GustosEnPotes.findOne({
            where: {
                idPote,
                idGusto
            }
        });
        return res.json({
            data: gustoEnPotes
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }
};
/*--- add gusto pote ---*/
controller.adminAddGusto = async (req, res) => {
    try {
        const { idPote } = req.params;
        const { idGusto } = req.body;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'tamanio']
        });
        const weight = pote.tamanio;
        const constante_pote = await Constante_pote.findOne({
            where: {
                weight
            }
        });
        const cantidadMaxima = constante_pote.maxQuantity;
        if (pote.cantidad < cantidadMaxima) {
            const gustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
            })
            if (gustoEnPote) {
                const addVecesUsado = gustoEnPote.vecesUsado + 1;
                await GustosEnPotes.update({
                    vecesUsado: addVecesUsado,
                },
                    {
                        where: {
                            idGusto,
                            idPote
                        }
                    }
                )
            } else {
                const newGustoEnPote = await GustosEnPotes.create({
                    idGusto,
                    idPote,
                    vecesUsado: 1
                })
            }
            const addCantidad = pote.cantidad + 1;
            await Potes.update({
                cantidad: addCantidad,
            },
                {
                    where: {
                        idPote
                    }
                })
            const consultaGustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            return res.json({
                message: 'The gusto has been asignate by pote',
                data: consultaGustoEnPote
            })
        } else {
            return res.json({
                message: 'the maximum amount of tastes has been reached',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }


};
/*--- delete gusto pote ---*/
controller.adminDeleteGusto = async (req, res) => {
    try {
        const { idPote, idGusto } = req.params;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'tamanio']
        });
        const weight = pote.tamanio;
        const constante_pote = await Constante_pote.findOne({
            where: {
                weight
            }
        });
        const cantidadMaxima = constante_pote.maxQuantity;
        if (pote.cantidad <= cantidadMaxima) {
            const gustoSeleccionado = await Gustos.findOne({
                where: {
                    idGusto
                },
                attributes: ['idGusto']
            });
            const gustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            if (gustoEnPote && gustoEnPote.vecesUsado > 1) {
                const dissVecesUsado = gustoEnPote.vecesUsado - 1;
                await GustosEnPotes.update({
                    vecesUsado: dissVecesUsado,
                },
                    {
                        where: {
                            idGusto,
                            idPote
                        }
                    }
                )
                const dissCantidad = pote.cantidad - 1;
                await Potes.update({
                    cantidad: dissCantidad,
                },
                    {
                        where: {
                            idPote
                        }
                    })
            } else if (gustoEnPote) {
                const deleteRowCount = await GustosEnPotes.destroy({
                    where: {
                        idGusto,
                        idPote
                    }
                });
                const dissCantidad = pote.cantidad - 1;
                await Potes.update({
                    cantidad: dissCantidad,
                },
                    {
                        where: {
                            idPote
                        }
                    });
                return res.json({
                    message: 'The Gusto has been deleted by pote',
                    countItemPedido: deleteRowCount,
                });
            }
            const consultaGustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                }
            })
            return res.json({
                message: 'The gusto has been deleted by pote',
                data: consultaGustoEnPote
            })
        } else {
            return res.json({
                message: 'There are no gustos to delete',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }


};

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/

module.exports = controller;