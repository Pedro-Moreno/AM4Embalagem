import Rack from '../models/rack';

class rackController {
    async index(req, res) {
        const racks = await Rack.findAll();
        res.json(racks)
    }

    async store(req, res) {
        try {
            const rack = Rack.create(req.body);

            return res.json(rack);
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
            const rack = await Rack.findByPk(id);

            if (!rack) {
                return res.status(400).json({
                    errors: ['Rack não existe'],
                });
            }

            return res.json(rack);
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
            const rack = await Rack.findByPk(id);

            if (!rack) {
                return res.status(400).json({
                    errors: ['Rack não existe'],
                });
            }

            await rack.destroy();
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
            const rack = await Rack.findByPk(id);

            if (!rack) {
                return res.status(400).json({
                    errors: ['Rack não existe'],
                });
            }

            const rackAtualizado = await rack.update(req.body);

            return res.json(rackAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map(err => err.message),
            });
        }
    }
}

export default new rackController();
