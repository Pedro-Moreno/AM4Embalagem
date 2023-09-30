import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Rack from '../models/rack';

const models = [Rack];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
