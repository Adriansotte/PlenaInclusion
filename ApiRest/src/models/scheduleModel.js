const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const ScheduleModel = db.define('Schedule', {
    ID_Schedule: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    ID_Activity: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ID_Type: {
        type: DataTypes.UUID,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartHour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    FinishHour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Frequency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    FinishDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true,
    tableName: 'Schedule',
    paranoid: true,
    deletedAt: 'softDelete'
});

(async () => {
    await db.sync();
})();

module.exports = ScheduleModel;


