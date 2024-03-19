import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import session from "express-session";
import oAuthRouter from "./routes/oAuth.js"

const app = express();

app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', function (req, res) {
    res.render('pages/auth');
});

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// configura la vista para que sea ejs
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.use(router);
app.use(oAuthRouter);

//Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
