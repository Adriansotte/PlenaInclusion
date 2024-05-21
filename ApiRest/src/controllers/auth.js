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
        // Acceso a los datos del formulario
        const formData = req.body;

        // Acceso al archivo subido
        const file = req.file;

        // Verifica si se ha enviado un archivo
        if (file) {
            // Si hay un archivo, agrega su nombre al objeto formData
            formData.Photo = file.filename;
        }

        // Encripta la contraseña
        const Pass = await encrypt(formData.Pass);

        // Crea el objeto de datos del usuario
        const userData = {
            DNI: formData.DNI,
            Rol: formData.Rol,
            Name: formData.Name,
            Surname_1: formData.Surname_1,
            Surname_2: formData.Surname_2,
            Email: formData.Email,
            Pass: Pass,
            Photo: `${process.env.DATABASEIP}:${process.env.PORT}/${formData.Photo}`,
            DNI_tutor: formData.DNI_tutor,
            Adress: formData.Adress,
            Phone: formData.Phone,
            BirthDay: formData.BirthDay
        };

        // Crea el usuario en la base de datos
        const newUser = await UserModel.create(userData);

        // Oculta la contraseña antes de enviarla en la respuesta
        newUser.set('Pass', undefined, { strict: false });

        // Genera un token de sesión para el usuario
        const token = await tokenSign(newUser);

        // Envía la respuesta con el token y los datos del usuario
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
};

/**
 * Es el encargado de loggear una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Form Data:', formData);

        // Verifica que los datos validados no estén vacíos
        if (!formData.Email || !formData.Pass) {
            handleHttpError(res, "VALIDATION_ERROR", 400);
            return;
        }

        const user = await UserModel.findOne({ where: { Email: formData.Email } });
        console.log('User:', user); // Depuración: Verifica que el usuario se encuentra

        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }

        const hashPassword = user.Pass;
        const check = await compare(formData.Pass, hashPassword); // Usa formData en lugar de req.body directamente
        console.log('Password Check:', check); // Depuración: Verifica el resultado de la comparación de contraseñas

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        user.set('Pass', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        };
        res.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGGIN_USER");
    }
};

module.exports = { loginController, registerController }