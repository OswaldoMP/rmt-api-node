'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Flows', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            UUID: {
                type: Sequelize.BIGINT
            },
            id_user: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            name: {
                type: Sequelize.STRING
            },
            typeStep: {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            date: {
                type: Sequelize.DATE
            },
            version: {
                type: Sequelize.INTEGER
            },
            isDelete: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            isPublic: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('Flows');
    }
};