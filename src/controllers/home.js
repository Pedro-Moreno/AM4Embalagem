import Rack from '../models/rack';

class homeController {
    async index(req, res) {
        res.json('Index');
    }
}

export default new homeController();
