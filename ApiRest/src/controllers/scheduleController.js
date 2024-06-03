const ScheduleModel = require('../models/scheduleModel');
const ActivityModel = require('../models/activityModel');
const TypeModel = require('../models/typeModel');
const CampaignModel = require('../models/campaignModel');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");
const User_ScheduleModel = require("../models/user_scheduleModel")

async function getAllSchedules(req, res) {
    try {
        const schedules = await ScheduleModel.findAll({
            include: [
                { model: ActivityModel },
                { model: TypeModel },
                { model: CampaignModel }
            ]
        });
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
        const schedule = await ScheduleModel.findByPk(id, {
            include: [
                { model: ActivityModel },
                { model: TypeModel },
                { model: CampaignModel }
            ]
        });
        res.json(schedule);
    } catch (error) {
        console.error('Error al obtener el horario:', error);
        handleHttpError(res, "ERROR_GET_SCHEDULE")
    }
}

const postSchedule = async (req, res) => {
    try {
        console.log(req.body)
        const body = req.body;
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

        const userScheduleAsociated = await User_ScheduleModel.findOne({
            where: { ScheduleIDSchedule: id }
        })

        if (userScheduleAsociated) {
            return res.status(404).json({ error: "SCHEDULE_ASOCIATED" });
        }

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

const incrementAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await ScheduleModel.findByPk(id);
        if (!schedule) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        schedule.Attendance = (schedule.Attendance || 0) + 1;
        await schedule.save();
        res.json({ data: schedule });
    } catch (error) {
        console.error('Error al incrementar la asistencia:', error);
        handleHttpError(res, 'ERROR_INCREMENT_ATTENDANCE');
    }
};

const decrementAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await ScheduleModel.findByPk(id);
        if (!schedule) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        if (schedule.Attendance > 0) {
            schedule.Attendance = schedule.Attendance - 1;
            await schedule.save();
            res.json({ data: schedule });
        } else {
            res.status(400).json({ error: "Attendance cannot be less than 0" });
        }
    } catch (error) {
        console.error('Error al disminuir la asistencia:', error);
        handleHttpError(res, 'ERROR_DECREMENT_ATTENDANCE');
    }
};

module.exports = {
    getAllSchedules: getAllSchedules,
    postSchedule: postSchedule,
    incrementAttendance: incrementAttendance,
    decrementAttendance: decrementAttendance,
    deleteSchedule: deleteSchedule,
    updateSchedule: updateSchedule,
    getSchedule: getSchedule
};
