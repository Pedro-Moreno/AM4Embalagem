import Sequelize, { Model } from 'sequelize';

export default class Rack extends Model {
    static init(sequelize) {
        super.init({
            rack_id: {  // Alterado de 'id' para 'rack_id'
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pecas_produzida_total: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'Peças totais precisa ser um número inteiro',
                    },
                },
            },
            saldo_a_embalar: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'Saldo precisa ser um número inteiro',
                    },
                },
            },
        }, {
            sequelize,
            modelName: 'Rack',
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Rack, { foreignKey: 'rack_id', as: 'rack' });
    }
}
