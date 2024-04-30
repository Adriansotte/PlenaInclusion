const ScheduleModel = require('../models/scheduleModel');

async function getAllSchedules(req, res) {
    try {
        const schedules = await ScheduleModel.findAll();
        res.json(schedules);
    } catch (error) {
        console.error('Error al obtener todos los horarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los horarios' });
    }
}

const postSchedule = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await ScheduleModel.create(body);
    res.send(data);
}

module.exports = {
    getAllSchedules: getAllSchedules,
    postSchedule: postSchedule
};
