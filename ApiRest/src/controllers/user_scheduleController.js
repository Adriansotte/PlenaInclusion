const User_ScheduleModel = require('../models/user_scheduleModel');

async function getAllUser_Schedules(req, res) {
    try {
        const userSchedules = await User_ScheduleModel.findAll();
        res.json(userSchedules);
    } catch (error) {
        console.error('Error al obtener todos los usuarios con actividades:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios con actividades' });
    }
}

module.exports = {
    getAllUser_Schedules: getAllUser_Schedules
};
