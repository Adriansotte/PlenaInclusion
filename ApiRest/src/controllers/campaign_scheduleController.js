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

const postCampaignSchedule = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await Campaign_ScheduleModel.create(body);
    res.send(data);
}

module.exports = {
    getAllCampaign_Schedules: getAllCampaign_Schedules,
    postCampaignSchedule: postCampaignSchedule
};