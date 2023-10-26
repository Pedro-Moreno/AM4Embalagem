import Pedido from '../models/pedido';
import Rack from '../models/rack';

class pedidoController {
    async index(req, res) {
        try {
            const pedidos = await Pedido.findAll();

            if (pedidos.length === 0) {
                return res.status(404).json({ message: 'Nenhum pedido encontrado.' });
            }

            return res.json(pedidos);
        } catch (e) {
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar os pedidos.' });
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
