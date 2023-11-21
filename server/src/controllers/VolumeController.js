import Volume from '../models/volume';
import Pedido from '../models/pedido';
import Rack from '../models/rack';

class volumeController {
    async index(req, res) {
        const volumes = await Volume.findAll();
        res.json(volumes)
    }

    async store(req, res) {
        try {
            const volume = await Volume.create(req.body);

            // Atualizar peças embaladas no rack associado ao pedido
            const pedido = await Pedido.findByPk(req.body.pedido_id);

            if (!pedido) {
                return res.status(400).json({
                    errors: ['Pedido não encontrado'],
                });
            }

            if (req.body.pecas_embaladas > pedido.saldo_a_embalar) {
                return res.status(400).json({
                    errors: ['Quantidade de peças embaladas ultrapassa o saldo disponível'],
                });
            }

            // Atualizar o saldo_a_embalar no rack associado ao pedido
            pedido.saldo_a_embalar = pedido.saldo_a_embalar - req.body.pecas_embaladas;
            await pedido.save();

            const rack = await Rack.findByPk(pedido.rack_id);
            if (rack) {
                rack.saldo_a_embalar = rack.saldo_a_embalar - req.body.pecas_embaladas;
                await rack.save();
            }

            return res.json(volume);
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
            const volume = await Volume.findByPk(id);

            if (!volume) {
                return res.status(400).json({
                    errors: ['Volume não existe'],
                });
            }

            return res.json(volume);
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
            const volume = await Volume.findByPk(id);

            if (!volume) {
                return res.status(400).json({
                    errors: ['Volume não existe'],
                });
            }

            await volume.destroy();
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
            const volume = await Volume.findByPk(id);

            if (!volume) {
                return res.status(400).json({
                    errors: ['Volume não existe'],
                });
            }

            const volumeAtualizado = await volume.update(req.body);

            return res.json(volumeAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
}

export default new volumeController();
