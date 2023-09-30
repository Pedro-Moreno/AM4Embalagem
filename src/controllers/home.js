import Rack from '../models/rack';

class homeController {
    async index(req, res) {
        const novoRack = await Rack.create({
            pecas_produzida_total: 100,
            saldo_a_embalar: 100,
        })
        res.json(novoRack);
    }
}

export default new homeController();
