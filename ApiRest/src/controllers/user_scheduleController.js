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

const postUser_Schedule = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await User_ScheduleModel.create(body);
    res.send(data);
}

module.exports = {
    getAllUser_Schedules: getAllUser_Schedules,
    postUser_Schedule: postUser_Schedule
};
