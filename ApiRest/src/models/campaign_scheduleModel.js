const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const Campaign_ScheduleModel = db.define('Campaign_Schedule', {
    ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'Campaign_Schedule'
});

(async () => {
    await db.sync();
})();

module.exports = Campaign_ScheduleModel;
