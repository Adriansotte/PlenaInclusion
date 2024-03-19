import express from "express";
import { GetUrls, acortarUrl, MostrarUrls, editarUrl, incrementarContador, todasUrls } from "../controllers/urlController.js";

const router = express.Router();

// Obtener urls
router.get('/urls', GetUrls);

// Ruta para acortar URL
router.post('/acortar-url', acortarUrl);

// Obtener todas las URLs del usuario
router.get('/listaURL', MostrarUrls);

// Ruta para incrementar el contador de una URL
router.get('/incrementar/:id', incrementarContador);

// Ruta para mostrar todas las URLs
router.get('/listaURLTodas', todasUrls);

// Editar URL
router.post('/editarUrl', editarUrl);

export default router;