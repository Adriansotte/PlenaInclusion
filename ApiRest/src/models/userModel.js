const { DataTypes } = require("sequelize");
const db = require("../config/config.js");

const UserModel = db.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: true
});

(async () => {
    await db.sync();
})();

module.exports = UserModel;
