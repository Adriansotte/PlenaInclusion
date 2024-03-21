import express from "express";
import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';

const oAuthRouter = express.Router();

var userProfile;

oAuthRouter.use(passport.initialize());
oAuthRouter.use(passport.session());
oAuthRouter.get('/success', (req, res) => res.render('success', { user: userProfile }));
oAuthRouter.get('/error', (req, res) => res.send("error logging in"));

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

oAuthRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

oAuthRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    async function (req, res) {
        try {
            req.session.userId = req.user.id;

            // Aqui lo que hago es que si no se encuentra ninguna Url asociada a la id del usuario, se crea una default de google
            // const existente = await Url.findOne({ where: { userId: req.user.id } });
            // if (existente == null) {
            //     const shortUrl = nanoid(8);
            //     await Url.create({
            //         userId: req.user.id,
            //         origUrl: 'https://www.google.com/webhp?hl=es&sa=X&ved=0ahUKEwi4tpOv4MiDAxWxdqQEHa6hBB8QPAgJ',
            //         shortUrl: shortUrl,
            //         clicks: 0
            //     });
            // }
            return res.redirect('/success');
        } catch (error) {
            console.error(error);
            return res.redirect('/error');
        }
    });

export default oAuthRouter;
