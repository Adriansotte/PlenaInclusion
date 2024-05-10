const { handleHttpError } = require("../utils/handleError")

const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT-TOKEN", 401);
            return;
        }
        const token = req.headers.authorization.split(' ').pop();

    } catch (error) {

    }
}

module.exports = authMiddleware;