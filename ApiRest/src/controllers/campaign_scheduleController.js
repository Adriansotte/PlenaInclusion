const Campaign_ScheduleModel = require("../models/campaign_scheduleModel");

async function getAllCampaign_Schedules(req, res) {
    try {
        const campaign_Schedules = await Campaign_ScheduleModel.findAll();
        res.json(campaign_Schedules);
    } catch (error) {
        console.error('Error al obtener todos los (intermedia entre schedule y campaign)):', error);
        res.status(500).json({ error: 'Error al obtener todos los (intermedia entre schedule y campaign)' });
    }
}

module.exports = {
    getAllCampaign_Schedules: getAllCampaign_Schedules
};