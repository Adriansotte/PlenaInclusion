const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const UserModel = require('../models/userModel');


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT-TOKEN", 401);
            return;
        }
        console.log("hola")
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        console.log(dataToken)

        if (!dataToken.ID_user) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }

        const user = await UserModel.findByPk(dataToken.ID_user);
        console.log("user", user)
        req.user = user

        next();

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
        return;
    }
}

module.exports = authMiddleware;


module.exports = { authMiddleware };