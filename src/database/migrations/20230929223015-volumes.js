'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('volumes', {
            volume_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            pedido_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Pedidos', // O nome da tabela referenciada
                    key: 'pedido_id',         // O nome da coluna na tabela referenciada
                },
            },
            pecas_embaladas: {
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
        await queryInterface.addConstraint('volumes', {
            fields: ['pedido_id'],
            type: 'foreign key',
            name: 'fk_pedido_id', // Nome da restrição (opcional)
            references: {
                table: 'Pedidos',
                field: 'pedido_id',
            },
            onDelete: 'CASCADE', // Ação de exclusão em cascata (opcional)
            onUpdate: 'CASCADE', // Ação de atualização em cascata (opcional)
        });
    },

    async down(queryInterface) {
        // Remova a restrição de chave estrangeira antes de excluir a tabela
        await queryInterface.removeConstraint('volumes', 'fk_pedido_id');

        // Em seguida, exclua a tabela
        await queryInterface.dropTable('volumes');
    }
};
