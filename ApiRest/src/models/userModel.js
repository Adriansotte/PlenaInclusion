const { DataTypes } = require('sequelize');
const db = require("../config/config.js");
// const User_ScheduleModel = require("./user_scheduleModel.js"); // Importa el modelo de la tabla de unión
// const ScheduleModel = require("./scheduleModel.js"); // Importa el modelo de horario


const UserModel = db.define('User', {
    // ID_usuario: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    ID_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    DNI: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Rol: {
        type: DataTypes.ENUM('Participante', 'Monitor', 'Coordinador'),
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Surname_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Surname_2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Photo: {
        type: DataTypes.STRING
    },
    DNI_tutor: {
        type: DataTypes.UUID,
        allowNull: true
    },
    Adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'User'
});


(async () => {
    await db.sync();
})();

// Esta es la relacion N,N
// UserModel.belongsToMany(ScheduleModel, { through: User_ScheduleModel });

module.exports = UserModel;

