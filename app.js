import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import home from './src/routes/home';
import rackRoutes from './src/routes/rackRoutes';
import pedidoRoutes from './src/routes/pedidoRoutes';
import volumeRoutes from './src/routes/volumeRoutes';

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
