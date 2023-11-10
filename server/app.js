import dotenv from 'dotenv';

dotenv.config();

import './database';

import express from 'express';
import home from './routes/home';
import rackRoutes from './routes/rackRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import volumeRoutes from './routes/volumeRoutes';

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
