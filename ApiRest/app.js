require("dotenv").config();
const express = require("express");
const cors = require("cors");
const defineRelations = require("./src/models/relations");
const app = express();

// Conexion a la base de datos
const sequelize = require('./src/config/config');
// const userRoutes = require("./src/routes/users");

app.use(cors());

app.use(express.json());

// Para sacar los archivos staticos
app.use(express.static("src/storage"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

defineRelations();

/**
 * Aqui invocamos las rutas
*/
app.use("/api", require("./src/routes"));


// Verificar la conexión a la base de datos
sequelize
    .authenticate()
    .then(() => {
        console.log('*** CONEXION CORRECTA ***');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

// app.use("/api", require("./src/routes/users"));
