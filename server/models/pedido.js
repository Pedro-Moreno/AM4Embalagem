import Sequelize, { Model } from 'sequelize';

export default class Pedido extends Model {
    static init(sequelize) {
        super.init({
            pedido_id: {  // Alterado de 'id' para 'pedido_id'
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rack_id: Sequelize.INTEGER,
            pecas_produzida: Sequelize.INTEGER,
        }, {
            sequelize,
            modelName: 'Pedido',
        });
        return this;
    }
}
