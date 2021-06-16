'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserBrief extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserBrief.belongsTo(models.Flow, {
                as: 'flow',
                foreignKey: 'id_flow',
                sourceKey: 'id',
            });
        }
    };
    UserBrief.init({
        id_flow: DataTypes.INTEGER,
        name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        birthplace: DataTypes.STRING,
        mail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                }
            }
        },
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'UserBrief',
    });
    return UserBrief;
};