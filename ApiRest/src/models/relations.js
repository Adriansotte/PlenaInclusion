const UserModel = require("./userModel.js");
const ScheduleModel = require("./scheduleModel.js");
const ActivityModel = require("./activityModel.js");
const User_ScheduleModel = require("./user_scheduleModel.js");
const TypeModel = require("./typeModel.js");
const CampaignModel = require("./campaignModel.js");
const Campaign_ScheduleModel = require("./campaign_scheduleModel.js")

// Define las relaciones entre los modelos
const defineRelations = () => {
    // Relación 1:N entre Schedule y Activity
    ScheduleModel.belongsTo(ActivityModel, { foreignKey: 'ID_Activity', onDelete: 'CASCADE' });
    // Relacion entre Type y Schedule
    ScheduleModel.belongsTo(TypeModel, { foreignKey: 'ID_Type', onDelete: 'CASCADE' });
    // Relación N:N entre User y Schedule a través de la tabla de unión User_Schedule
    UserModel.belongsToMany(ScheduleModel, { through: User_ScheduleModel });
    ScheduleModel.belongsToMany(UserModel, { through: User_ScheduleModel });
    User_ScheduleModel.belongsTo(ScheduleModel, { foreignKey: 'ScheduleIDSchedule' });
    User_ScheduleModel.belongsTo(UserModel, { foreignKey: 'UserIDUser' });
    // Relacion N:N entre Campaign y Schedule a traves de la tabla Campaign_Schedule
    CampaignModel.belongsToMany(ScheduleModel, { through: Campaign_ScheduleModel });
    ScheduleModel.belongsToMany(CampaignModel, { through: Campaign_ScheduleModel });
    Campaign_ScheduleModel.belongsTo(ScheduleModel, { foreignKey: 'ScheduleIDSchedule' });
    Campaign_ScheduleModel.belongsTo(CampaignModel, { foreignKey: 'CampaignIDCampaign' });
}

module.exports = defineRelations;
