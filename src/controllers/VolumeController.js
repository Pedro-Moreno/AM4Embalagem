import Volume from '../models/volume';

class volumeController {
    async index(req, res) {
        const volumes = await Volume.findAll();
        res.json(volumes)
    }

    async store(req, res) {
        try {
            const volume = Volume.create(req.body);

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
