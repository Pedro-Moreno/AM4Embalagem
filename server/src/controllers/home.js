class homeController {
    async index(req, res) {
        res.json('Index');
    }
}

export default new homeController();
