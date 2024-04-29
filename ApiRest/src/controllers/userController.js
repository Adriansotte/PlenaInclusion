const UserModel = require('../models/userModel');

async function getAllUsers(req, res) {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios' });
    }
}

module.exports = {
    getAllUsers: getAllUsers
};
