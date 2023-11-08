import dotenv from 'dotenv';

dotenv.config();

import './server/database';

import express from 'express';
import home from './server/routes/home';
import rackRoutes from './server/routes/rackRoutes';
import pedidoRoutes from './server/routes/pedidoRoutes';
import volumeRoutes from './server/routes/volumeRoutes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', home);
        this.app.use('/racks/', rackRoutes);
        this.app.use('/pedidos/', pedidoRoutes);
        this.app.use('/volumes/', volumeRoutes);

    }
}

export default new App().app;
