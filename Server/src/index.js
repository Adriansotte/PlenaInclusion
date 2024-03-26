import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import oAuthRouter from "./routes/oAuth.js"
import userRouter from "./routes/user.js";

const app = express();

const corsOption = {
    origin: ['http://localhost:4200', "http://localhost:3000/auth/google/callback", "http://localhost:3000/auth/google", "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=681862709269-q0qtq3v8lu54mvl9kge3qi5enrnnevqq.apps.googleusercontent.com"],
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true
}
app.use(cors(corsOption));

app.set('view engine', 'ejs');


// Configuración de sesiones
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
    // cookie: { secure: false }
}));

// Middleware de análisis de cuerpos de solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(userRouter);
app.use(oAuthRouter);

// Puerto en el que se ejecuta el servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Express iniciado en el puerto ${port}`);
});
