const TypeModel = require("../models/typeModel")

async function getAllTypes(req, res) {
    try {
        const types = await TypeModel.findAll();
        res.json(types);
    } catch (error) {
        console.error('Error al obtener todos los tipos:', error);
        res.status(500).json({ error: 'Error al obtener todos los tipos' });
    }
}

module.exports = {
    getAllTypes: getAllTypes
};