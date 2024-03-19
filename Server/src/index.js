import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors"; // Importa el paquete CORS
import oAuthRouter from "./routes/oAuth.js"
import userRouter from "./routes/user.js";

const app = express();

app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

// Configura CORS
app.use(cors());

app.get('/', function (req, res) {
    res.render('pages/auth');
});

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(oAuthRouter);

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
