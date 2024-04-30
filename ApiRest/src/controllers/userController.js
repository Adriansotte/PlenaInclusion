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

const getUser = async (req, res) => {

}

const postUser = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await UserModel.create(body);
    res.send( data );
}

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    postUser: postUser
};
