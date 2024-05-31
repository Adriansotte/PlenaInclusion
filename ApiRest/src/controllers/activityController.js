const ActivityModel = require("../models/activityModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");
const ScheduleModel = require("../models/scheduleModel");

const getAllActivities = async (req, res) => {
    try {
        const user = req.user;
        const activities = await ActivityModel.findAll();
        res.json(activities);
    } catch (error) {
        console.error('Error al obtener todos los actividades:', error);
        res.status(500).json({ error: 'Error al obtener todos los actividades' });
    }
}

const getActivity = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const activity = await ActivityModel.findByPk(id);
        res.json(activity);
    } catch (error) {
        console.error('Error al obtener la actividad:', error);
        handleHttpError(res, "ERROR_GET_ACTIVITIES")
    }
}

const postActivity = async (req, res) => {
    try {
        const formData = req.body;
        const file = req.file;
        if (file) {
            formData.Photo = file.filename;
        }
        const activityData = {
            Name: formData.Name,
            Description: formData.Description,
            Photo: `http://${process.env.DATABASEIP}:${process.env.PORT}/${formData.Photo}`,
        }
        const data = await ActivityModel.create(activityData);
        res.status(201).json({ activityData });

    } catch (e) {
        handleHttpError(res, 'ERROR_POST_ACTIVITY')
    }
}

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        const file = req.file;

        if (file) {
            formData.Photo = `http://${process.env.DATABASEIP}:${process.env.PORT}/${file.filename}`;
        }

        const activityBeforeUpdate = await ActivityModel.findByPk(id);
        if (!activityBeforeUpdate) {
            return res.status(404).send({ error: "Activity not found" });
        }

        await ActivityModel.update(formData, {
            where: { ID_activity: id }
        });

        const activityAfterUpdate = await ActivityModel.findByPk(id);

        return res.send({ data: activityAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
        handleHttpError(res, 'ERROR_UPDATE_ACTIVITY');
    }
};

const deleteActivity = async (req, res) => {
    try {

        const { id } = req.params;
        const activity = await ScheduleModel.findOne({
            where: { ID_Activity: id }
        });
        if (activity) {
            return res.status(404).json({ error: "ACTIVITY_IN_SCHEDULE" });
        }
        const user = await ActivityModel.destroy({
            where: { ID_activity: id }
        });
        if (user === 1) {
            return res.json({ message: "Activity deleted successfully" });
        } else {
            return res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        return handleHttpError(res, "ERROR_DELETE_ACTIVITY");
    }
};

module.exports = {
    getAllActivities: getAllActivities,
    postActivity: postActivity,
    getActivity: getActivity,
    updateActivity: updateActivity,
    deleteActivity: deleteActivity
};
