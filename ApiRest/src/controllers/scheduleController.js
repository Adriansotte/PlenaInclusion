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

module.exports = {
    getAllSchedules: getAllSchedules
};
