const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const CampaignModel = db.define('Campaign', {
    ID_Campaign: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
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
    timestamps: false,
    tableName: 'Campaign'
});


(async () => {
    await db.sync();
})();


module.exports = CampaignModel;