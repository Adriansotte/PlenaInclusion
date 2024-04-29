const CampaignModel = require("../models/campaignModel");

async function getAllCampaigns(req, res) {
    try {
        const campaign = await CampaignModel.findAll();
        res.json(campaign);
    } catch (error) {
        console.error('Error al obtener todos las campañas:', error);
        res.status(500).json({ error: 'Error al obtener todos las campañas' });
    }
}

module.exports = {
    getAllCampaigns: getAllCampaigns
};