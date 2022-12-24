import { Sequelize,DataTypes } from "sequelize";
import {sequelizeConnection as sequelize} from '../database.js';

export const UserModel = sequelize.define('User',{
    firstName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
})