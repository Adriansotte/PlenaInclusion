const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * 
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            ID_user: user.ID_user,
            Rol: user.Rol
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign;
};

/**
 * 
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch(e){
        return null;
    }
}

module.exports = { verifyToken, tokenSign }