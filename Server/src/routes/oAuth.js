import express from "express";
import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import User from "../models/userModel.js";

const oAuthRouter = express.Router();

var userProfile;

oAuthRouter.use(passport.initialize());
oAuthRouter.use(passport.session());

// Redirige al usuario a la página después de la autenticación
oAuthRouter.get('/success', (req, res) => {
    res.redirect('http://localhost:4200/home');
});

// Maneja los errores de autenticacion
oAuthRouter.get('/error', (req, res) => {
    res.redirect('/error');
});

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/* Google AUTH */
// Configura las credenciales de Google manualmente
const GOOGLE_CLIENT_ID = '681862709269-q0qtq3v8lu54mvl9kge3qi5enrnnevqq.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

// Ruta para iniciar la autenticación con Google
oAuthRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de retorno después de la autenticación con Google
oAuthRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    async function (req, res) {
        try {
            const existingUser = await User.findOne({ where: {email: userProfile.emails[0].value }});
            if (!existingUser) {
                const newUser = await User.create({
                    email: userProfile.emails[0].value,
                    userName: userProfile.displayName
                });
                console.log('Nuevo usuario creado:', newUser);
            }
            req.session.userId = req.user.id;

            return res.redirect('/success');
        } catch (error) {
            console.error(error);
            return res.redirect('/error');
        }
    });

export default oAuthRouter;
