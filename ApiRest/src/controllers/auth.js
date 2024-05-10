const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const UserModel = require('../models/userModel');



/**
 * Este conrolador es el encargado de registrar al usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        req = matchedData(req);
        const Pass = await encrypt(req.Pass)
        const body = { ...req, Pass }
        const dataUser = await UserModel.create(body);
        // TODO: mirar que el strict valga
        dataUser.set('Pass', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

/**
 * Es el encargado de loggear una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const user = await UserModel.findOne({ where: { Email: validatedData.Email } });

        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }
        const hashPassword = user.Pass;
        const check = await compare(req.body.Pass, hashPassword);

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        user.set('Pass', undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_LOGGIN_USER")
    }
}

module.exports = { loginController, registerController }