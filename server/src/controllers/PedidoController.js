import Pedido from '../models/pedido';
const { Op } = require('sequelize');

class pedidoController {
    async index(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando ID'],
                });
            }
            const pedidos = await Pedido.findAll({
                where: {
                    rack_id: id
                }
            });
            res.json(pedidos);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }


    async store(req, res) {
        try {
            const pedido = Pedido.create(req.body);

            return res.json(pedido);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando ID'],
                });
            }
            const pedido = await Pedido.findByPk(id);

            if (!pedido) {
                return res.status(400).json({
                    errors: ['Pedido não existe'],
                });
            }

            return res.json(pedido);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando ID'],
                });
            }
            const pedido = await Pedido.findByPk(id);

            if (!pedido) {
                return res.status(400).json({
                    errors: ['Pedido não existe'],
                });
            }

            await pedido.destroy();
            return res.json({
                apagado: true,
            });

        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                // Tratar erro de chave estrangeira (FK)
                return res.status(400).json({
                    errors: ['Não é possível excluir o pedido devido a dependências (volumes associados).'],
                });
            }
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando ID'],
                });
            }
            const pedido = await Pedido.findByPk(id);

            if (!pedido) {
                return res.status(400).json({
                    errors: ['Pedido não existe'],
                });
            }

            const pedidoAtualizado = await pedido.update(req.body);

            return res.json(pedidoAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
}

export default new pedidoController();
