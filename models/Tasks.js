
//Tobe made to fit with days and time of day
const {Model, DataTypes} = require('sequelize');
const sequelize  = require('../config/connection');

class Tasks extends Model {}

Tasks.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        tasks_text: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: [1]
           }
       },
       user_id: {
           type: DataTypes.INTEGER,
           references: {
               model: 'user', 
               key: 'id'
           }
       },
       day_id: {
           type:DataTypes.INTEGER,
           references: {
               model: 'days',
               key: 'id'
           }
       }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'tasks'
    }
);
module.exports = Tasks;
