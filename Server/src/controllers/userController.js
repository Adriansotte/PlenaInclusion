import User from '../models/userModel.js';

export const GetUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(error) {
        console.log(error);
    }
}

export const AddUser = async (req, res) => {
    try {
        const newUser = await User.create({
            email: "ADrian@gmail.comasdasd",
            userName: "Adrian"
        });
        res.json(newUser);
    } catch(error) {
        console.log(error);
    }
}