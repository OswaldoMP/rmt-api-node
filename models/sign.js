'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sign extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Sign.belongsTo(models.Flow, {
                as: 'flow',
                foreignKey: 'id_flow',
                sourceKey: 'id',
            });
        }
    };
    Sign.init({
        id_flow: DataTypes.INTEGER,
        file: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Sign',
    });
    return Sign;
};