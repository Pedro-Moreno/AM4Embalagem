import Sequelize, { Model } from 'sequelize';

export default class Volume extends Model {
    static init(sequelize) {
        super.init({
            volume_id: {  // Alterado de 'id' para 'volume_id'
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pedido_id: Sequelize.INTEGER,
            pecas_embaladas: Sequelize.INTEGER,
        }, {
            sequelize,
            modelName: 'Volume',
        });
        return this;
    }
}
