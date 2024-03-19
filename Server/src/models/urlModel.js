import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Url = db.define('url', {
    userId: {
        type: DataTypes.STRING
    },
    origUrl: {
        type: DataTypes.STRING
    },
    shortUrl: {
        type: DataTypes.STRING
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Url;
