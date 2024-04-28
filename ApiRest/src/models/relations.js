const UserModel = require("./userModel.js") ;
const ScheduleModel = require("./scheduleModel.js") ;
const ActivityModel = require("./activityModel.js") ;
const User_ScheduleModel = require("./user_scheduleModel.js");

// Define las relaciones entre los modelos
const defineRelations = () => {
    // Relación 1:N entre Schedule y Activity
    ScheduleModel.belongsTo(ActivityModel, { foreignKey: 'ID_Activity', onDelete: 'CASCADE' });
    // Relación N:N entre User y Schedule a través de la tabla de unión User_Schedule
    UserModel.belongsToMany(ScheduleModel, { through: User_ScheduleModel });
    ScheduleModel.belongsToMany(UserModel, { through: User_ScheduleModel });
}

module.exports = defineRelations;
