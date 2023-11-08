'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Pedidos', {
            pedido_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            rack_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'racks', // O nome da tabela referenciada
                    key: 'rack_id', // O nome da coluna na tabela referenciada
                },
            },
            pecas_produzida: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        // Adicione uma restrição de chave estrangeira
        await queryInterface.addConstraint('Pedidos', {
            fields: ['rack_id'],
            type: 'foreign key',
            name: 'fk_rack_id', // Nome da restrição (opcional)
            references: {
                table: 'racks',
                field: 'rack_id',
            },
            onDelete: 'CASCADE', // Ação de exclusão em cascata (opcional)
            onUpdate: 'CASCADE', // Ação de atualização em cascata (opcional)
        });
    },

    async down(queryInterface) {
        // Remova a restrição de chave estrangeira antes de excluir a tabela
        await queryInterface.removeConstraint('Pedidos', 'fk_rack_id');

        // Em seguida, exclua a tabela
        await queryInterface.dropTable('Pedidos');
    }
};
