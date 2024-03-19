import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('user', {
    email: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default User;