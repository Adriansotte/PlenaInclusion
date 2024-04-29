const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const User_ScheduleModel = db.define('UserSchedule', {
    ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // UserID: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: UserModel,
    //         key: 'ID_user'
    //     }
    // },
    // ScheduleID: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: ScheduleModel,
    //         key: 'ID_Schedule'
    //     }
    // },
    AttendanceDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Comment: {
        type: DataTypes.STRING
    },
    Rating: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'UserSchedule'
});

(async () => {
    await db.sync();
})();

// Esta es la relacion N,N
// User_ScheduleModel.belongsTo(UserModel, { foreignKey: 'UserID' });
// User_ScheduleModel.belongsTo(ScheduleModel, { foreignKey: 'ScheduleID' });

module.exports = User_ScheduleModel;
