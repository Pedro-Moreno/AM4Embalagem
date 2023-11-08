import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Rack from '../models/rack';
import Pedido from '../models/pedido';
import Volume from '../models/volume';

const models = [Rack, Pedido, Volume];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
