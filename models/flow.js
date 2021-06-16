'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Flow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Flow.hasMany(models.UserBrief, {
                as: 'allUserBrief',
                foreignKey: 'id_flow',
                sourceKey: 'id',
            });

            Flow.hasMany(models.ValidateCamera, {
                as: 'allValidateCamera',
                foreignKey: 'id_flow',
                sourceKey: 'id',
            });

            Flow.hasMany(models.Sign, {
                as: 'allSign',
                foreignKey: 'id_flow',
                sourceKey: 'id',
            });

            Flow.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'id_user',
                sourceKey: 'id',
            });
        }
    };
    Flow.init({
        UUID: DataTypes.BIGINT,
        id_user: DataTypes.INTEGER,
        name: DataTypes.STRING,
        typeStep: DataTypes.ARRAY(DataTypes.INTEGER),
        date: DataTypes.DATE,
        version: DataTypes.INTEGER,
        isDelete: DataTypes.BOOLEAN,
        isPublic: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Flow',
    });
    return Flow;
};