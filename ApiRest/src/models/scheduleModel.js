const { DataTypes } = require('sequelize');
const db = require("../config/config.js");
// const ActivityModel = require("./activityModel");
// const User_ScheduleModel = require("./user_scheduleModel"); // Importa el modelo de la tabla de unión
// const UserModel = require("./userModel"); // Importa el modelo de usuario

//console.log("Hola" + UserModel);


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
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'Schedule'
});

(async () => {
    await db.sync();
})();

// // Definir la relación con la tabla de actividad
// ScheduleModel.belongsTo(ActivityModel, { foreignKey: 'ID_Activity', onDelete: 'CASCADE' });
// // Esta es la relacion N,N
// ScheduleModel.belongsToMany(UserModel, { through: User_ScheduleModel });

module.exports = ScheduleModel;


