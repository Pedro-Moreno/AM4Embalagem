'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable('Pedidos', 'pedidos');
    },

    down: async (queryInterface, Sequelize) => {
    }
};
