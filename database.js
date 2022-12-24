import { Sequelize } from "sequelize"
const sequelizeConnection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
        define:{
            freezeTableName:true
        },
    }
)
export {sequelizeConnection}