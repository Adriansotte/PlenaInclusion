const ActivityModel = require("../models/activityModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const getAllActivities = async (req, res) => {
    try {
        console.log("hola en el controlador de actividades")
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
        const body = matchedData(req);
        const data = await ActivityModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_POST_ACTIVITY')
    }
}

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const body = matchedData(req, { onlyValidData: true });
        const activityBeforeUpdate = await ActivityModel.findByPk(id);
        console.log(activityBeforeUpdate)
        if (!activityBeforeUpdate) {
            return res.status(404).send({ error: "Activity not found" });
        }
        await ActivityModel.update(body, {
            where: { ID_activity: id }
        });
        const activityrAfterUpdate = await ActivityModel.findByPk(id);
        return res.send({ data: activityrAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
        handleHttpError(res, 'ERROR_UPDATE_ACTIVITY');
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await ActivityModel.destroy({
            where: { ID_activity: id }
        });
        if (user === 1) {
            res.json({ message: "Activity deleted successfully" });
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        handleHttpError(res, "ERROR_DELETE_USER");
    }
};

module.exports = {
    getAllActivities: getAllActivities,
    postActivity: postActivity,
    getActivity: getActivity,
    updateActivity: updateActivity,
    deleteActivity: deleteActivity
};
