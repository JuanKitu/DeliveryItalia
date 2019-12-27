const controller = {};
const Potes = require('../models/Potes.js');
const GustosEnPotes = require('../models/GustosEnPotes');
const Gustos = require('../models/Gustos.js');


/*--- Create a pote ---*/
controller.new = async (req, res) => {
    const { cantidad, tamanio, cantidadMaxima } = req.body;
    try {
        const newPote = await Potes.create({
            cantidad,// el valor por default debe ser 0
            tamanio,
            cantidadMaxima
        }, {
            fields: ['cantidad', 'tamanio', 'cantidadMaxima']
        });
        if (newPote) {
            return res.json({
                message: 'The pote has been created',
                data: newPote
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        })

    };
};
/*--- Query of pote ---*/
controller.getAll = async (req, res) => {
    try {
        const pote = await Potes.findAll({
            attributes: ['idPote', 'tamanio', 'cantidad', 'cantidadMaxima']
        });
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
controller.change = async (req, res) => {
    try {
        const { idPote } = req.params;
        const { tamanio, cantidad, cantidadMaxima } = req.body;
        const newPote = await Potes.update({
            tamanio,
            cantidad,
            cantidadMaxima
        },
            {
                where: {
                    idPote
                }
            });
        const pote = await Potes.findOne({
            attributes: ['idPote', 'tamanio', 'cantidad', 'cantidadMaxima'],
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
/*--- Delete a pote ---*/
controller.delete = async (req, res) => {
    try {
        const { idPote } = req.params;
        const deleteRowCount = await Potes.destroy({
            where: {
                idPote
            }
        });
        return res.json({
            message: 'The pote has been deleted',
            count: deleteRowCount
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
controller.getById = async (req, res) => {
    try {
        const { idPote } = req.params;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'tamanio', 'cantidad', 'cantidadMaxima']
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
    try {
        const { idPote } = req.params
        const gustosEnPote = await GustosEnPotes.findAll({
            where: {
                idPote
            }
        });
        const gusto = [];
        for (let inc = 0; inc < gustosEnPote.length; inc++) {
            const gustoAux = await Gustos.findOne({
                where: {
                    idGusto: gustosEnPote[inc].idGusto
                },
                attributes: ['idGusto', 'nombre', 'descripcion', 'disponible', 'idCategoria']
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
/*--- add gusto pote ---*/
controller.addGusto = async (req, res) => {
    try {
        const { idPote } = req.params;
        const { idGusto } = req.body;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'cantidadMaxima']
        });

        if (pote.cantidad <= pote.cantidadMaxima) {
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
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
            })
            if (gustoEnPote !== null) {
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
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
            })
            return res.json({
                message: 'The gusto has been asignate by pote',
                data: consultaGustoEnPote
            })
        }else {
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


}
/*--- delete gusto pote ---*/
controller.deleteGusto = async (req, res) => {
    try {
        const { idPote } = req.params;
        const { idGusto } = req.body;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'cantidad', 'cantidadMaxima']
        });

        if (pote.cantidad <= pote.cantidadMaxima) {
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
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
            })
            if (gustoEnPote !== null && gustoEnPote.vecesUsado > 1) {
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
            } else if (gustoEnPote !== null) {
                GustosEnPotes.destroy({
                    where: {
                        idGusto,
                        idPote
                    }
                })
                const dissCantidad = pote.cantidad - 1;
                await Potes.update({
                    cantidad: dissCantidad,
                },
                    {
                        where: {
                            idPote
                        }
                    })
            }
            const consultaGustoEnPote = await GustosEnPotes.findOne({
                where: {
                    idGusto,
                    idPote
                },
                attributes: ['idGusto', 'idPote', 'vecesUsado']
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
        })
    }


}


module.exports = controller;