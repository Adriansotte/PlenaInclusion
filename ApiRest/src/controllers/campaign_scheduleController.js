const Campaign_ScheduleModel = require("../models/campaign_scheduleModel");
const ScheduleModel = require("../models/scheduleModel");
const CampaignModel = require("../models/campaignModel");
const ActivityModel = require("../models/activityModel");
const TypeModel = require("../models/typeModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const getAllCampaign_Schedules = async (req, res) => {
    try {
        const campaign_Schedules = await Campaign_ScheduleModel.findAll({
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel }
                    ]
                },
                { model: CampaignModel }
            ]
        });

        res.json(campaign_Schedules);
    } catch (error) {
        console.error('Error al obtener todos los (intermedia entre schedule y campaign)):', error);
        res.status(500).json({ error: 'Error al obtener todos los (intermedia entre schedule y campaign)' });
    }
}

const getCampaignSchedule = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const campaignSchedule = await Campaign_ScheduleModel.findByPk(id, {
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel }
                    ]
                },
                { model: CampaignModel }
            ]
        });
        res.json(campaignSchedule);
    } catch (error) {
        console.error('Error al obtener el item:', error);
        handleHttpError(res, "ERROR_GET_CAMPAIGN_SCHEDULE")
    }
}


const getSchedulesByCampaignId = async (req, res) => {
    const { campaignId } = req.params;

    try {
        const campaignSchedules = await Campaign_ScheduleModel.findAll({
            where: { CampaignIDCampaign: campaignId },
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel }
                    ]
                },
                { model: CampaignModel }
            ]
        });

        if (campaignSchedules.length === 0) {
            return res.status(404).json({ error: 'No se encontraron horarios para la campaña especificada' });
        }

        res.json(campaignSchedules);
    } catch (error) {
        console.error('Error al obtener los horarios de la campaña:', error);
        res.status(500).json({ error: 'Error al obtener los horarios de la campaña' });
    }
}

const getCampaignsByScheduleId = async (req, res) => {
    const { scheduleId } = req.params;

    try {
        const scheduleCampaigns = await Campaign_ScheduleModel.findAll({
            where: { ScheduleIDSchedule: scheduleId },
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel }
                    ]
                },
                { model: CampaignModel }
            ]
        });

        if (scheduleCampaigns.length === 0) {
            return res.status(404).json({ error: 'No se encontraron campañas para el horario especificado' });
        }

        res.json(scheduleCampaigns);
    } catch (error) {
        console.error('Error al obtener las campañas del horario:', error);
        res.status(500).json({ error: 'Error al obtener las campañas del horario' });
    }
}

const postCampaignSchedule = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await Campaign_ScheduleModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_POST_CAMPAIGN_SCHEDULE')
    }
}

const updateCampaignSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { scheduleId, campaignId } = req.body;

        const campaignScheduleBeforeUpdate = await Campaign_ScheduleModel.findByPk(id);
        if (!campaignScheduleBeforeUpdate) {
            return res.status(404).json({ error: "No se encontró la relación de campaña y horario para actualizar" });
        }

        await Campaign_ScheduleModel.update(
            { ScheduleIDSchedule: scheduleId, CampaignIDCampaign: campaignId },
            { where: { id: id } }
        );

        const campaignScheduleAfterUpdate = await Campaign_ScheduleModel.findByPk(id);
        return res.json({ data: campaignScheduleAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar la relación de campaña y horario:', error);
        return res.status(500).json({ error: 'Error al actualizar la relación de campaña y horario' });
    }
};

const deleteCampaignSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const campaignScheduleToDelete = await Campaign_ScheduleModel.findByPk(id);
        if (!campaignScheduleToDelete) {
            return res.status(404).json({ error: "No se encontró la relación de campaña y horario para eliminar" });
        }

        await Campaign_ScheduleModel.destroy({
            where: { id: id }
        });

        return res.json({ message: 'Relación de campaña y horario eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la relación de campaña y horario:', error);
        return res.status(500).json({ error: 'Error al eliminar la relación de campaña y horario' });
    }
};

module.exports = {
    getAllCampaign_Schedules: getAllCampaign_Schedules,
    postCampaignSchedule: postCampaignSchedule,
    deleteCampaignSchedule: deleteCampaignSchedule,
    updateCampaignSchedule: updateCampaignSchedule,
    getCampaignsByScheduleId: getCampaignsByScheduleId,
    getSchedulesByCampaignId: getSchedulesByCampaignId,
    getCampaignSchedule: getCampaignSchedule
};