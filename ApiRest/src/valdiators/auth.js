const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
    check("DNI").exists().notEmpty().isString(),
    check("Rol").exists().notEmpty().isIn(['Nominal', 'Monitor', 'Administrador']),
    check("Name").exists().notEmpty().isString().isLength({ min: 3, max: 99 }),
    check("Surname_1").exists().notEmpty().isString().isLength({ min: 3, max: 99 }),
    check("Surname_2").exists().notEmpty().isString().isLength({ min: 3, max: 99 }),
    check("Email").exists().notEmpty().isEmail(),
    check("Pass").exists().notEmpty().isString().isLength({ min: 3, max: 99 }),
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

const validatorLogin = [
    check("Email").exists().notEmpty().isEmail(),
    check("Pass").exists().notEmpty().isString().isLength({ min: 3, max: 99 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorRegister, validatorLogin };
