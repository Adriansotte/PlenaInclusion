const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
    check("DNI").exists().notEmpty().isString(),
    check("Rol").exists().notEmpty().isIn(['Participante', 'Monitor', 'Coordinador']),
    check("Name").exists().notEmpty().isString(),
    check("Surname_1").exists().notEmpty().isString(),
    check("Surname_2").exists().notEmpty().isString(),
    check("Email").exists().notEmpty().isEmail(),
    check("Pass").exists().notEmpty().isString(),
    check("Photo").optional().isString(),
    check("DNI_tutor").optional().custom((value, { req }) => {
        if (value !== null) {
            // Si el valor no es null, debe ser una cadena de hasta 10 caracteres
            return typeof value === 'string' && value.length <= 10;
        }
         // Si es null, la validación pasa
        return true;
    }).withMessage('DNI_tutor debe ser una cadena de hasta 10 caracteres si se proporciona'),
    check("Adress").exists().notEmpty().isString(),
    check("Phone").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetUser = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateUser, validatorGetUser };
