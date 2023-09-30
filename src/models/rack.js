import Sequelize, { Model } from 'sequelize';

export default class Rack extends Model {
    static init(sequelize) {
        super.init({
            rack_id: {  // Alterado de 'id' para 'rack_id'
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pecas_produzida_total: Sequelize.INTEGER,
            saldo_a_embalar: Sequelize.INTEGER,
        }, {
            sequelize,
            modelName: 'Rack',
        });
        return this;
    }
}
