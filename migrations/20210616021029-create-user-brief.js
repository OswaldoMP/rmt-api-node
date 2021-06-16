'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('UserBriefs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_flow: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Flows',
                    key: 'id'
                }
            },
            name: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            birthplace: {
                type: Sequelize.STRING
            },
            mail: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('UserBriefs');
    }
};