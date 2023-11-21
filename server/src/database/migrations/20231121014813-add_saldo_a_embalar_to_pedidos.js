'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Adicione o novo campo 'saldo_a_embalar'
        await queryInterface.addColumn('pedidos', 'saldo_a_embalar', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0, // Defina um valor padrão, se necessário
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remova o campo 'saldo_a_embalar'
        await queryInterface.removeColumn('pedidos', 'saldo_a_embalar');
    }
};
