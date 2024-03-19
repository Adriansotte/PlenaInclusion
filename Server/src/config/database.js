import { Sequelize } from "sequelize";

const db = new Sequelize('acortador', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

export default db;