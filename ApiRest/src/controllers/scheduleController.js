const ScheduleModel = require('../models/scheduleModel');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

async function getAllSchedules(req, res) {
    try {
        const schedules = await ScheduleModel.findAll();
        res.json(schedules);
    } catch (error) {
        console.error('Error al obtener todos los horarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los horarios' });
    }
}

const getSchedule = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const schedule = await ScheduleModel.findByPk(id);
        res.json(schedule);
    } catch (error) {
        console.error('Error al obtener el horario:', error);
        handleHttpError(res, "ERROR_GET_SCHEDULE")
    }
}

const postSchedule = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await ScheduleModel.create(body);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'ERROR_POST_SCHEDULE')
    }
}

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const body = matchedData(req, { onlyValidData: true });
        const scheduleBeforeUpdate = await ScheduleModel.findByPk(id);
        if (!scheduleBeforeUpdate) {
            return res.status(404).send({ error: "Schedule not found" });
        }
        await ScheduleModel.update(body, {
            where: { ID_schedule: id }
        });
        const scheduleAfterUpdate = await ScheduleModel.findByPk(id);
        return res.send({ data: scheduleAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar el horario:', error);
        handleHttpError(res, 'ERROR_UPDATE_SCHEDULE');
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await ScheduleModel.destroy({
            where: { ID_schedule: id }
        });
        if (schedule === 1) {
            res.json({ message: "Schedule deleted successfully" });
        } else {
            res.status(404).json({ error: "Schedule not found" });
        }
    } catch (error) {
        console.error('Error al eliminar el horario:', error);
        handleHttpError(res, "ERROR_DELETE_SCHEDULE");
    }
};


module.exports = {
    getAllSchedules: getAllSchedules,
    postSchedule: postSchedule,
    deleteSchedule: deleteSchedule,
    updateSchedule: updateSchedule,
    getSchedule: getSchedule
};
