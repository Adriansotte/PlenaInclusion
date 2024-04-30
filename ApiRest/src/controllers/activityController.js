const ActivityModel = require("../models/activityModel")

async function getAllActivities(req, res) {
    try {
        const activities = await ActivityModel.findAll();
        res.json(activities);
    } catch (error) {
        console.error('Error al obtener todos los actividades:', error);
        res.status(500).json({ error: 'Error al obtener todos los actividades' });
    }
}

const postActivity = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await ActivityModel.create(body);
    res.send( data );
}

module.exports = {
    getAllActivities: getAllActivities,
    postActivity: postActivity
};
