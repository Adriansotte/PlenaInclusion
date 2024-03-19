import { Sequelize } from "sequelize";

const db = new Sequelize('tfg_plena_inclusion', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

export default db;