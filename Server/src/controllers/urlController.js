// import Url from "../models/urlModel.js";
// import { nanoid } from 'nanoid';

// export const GetUrls = async (req, res) => {
//     try {
//         const urls = await Url.findAll({
//             attributes: ['id', 'origUrl', 'shortUrl', 'clicks']
//         });
//         res.json(urls);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const acortarUrl = async (req, res) => {
//     try {
//         const { origUrl } = req.body;
//         const userId = req.session.userId;
//         const shortUrl = nanoid(8);
//         const nuevaUrl = await Url.create({
//             userId: userId,
//             origUrl: origUrl,
//             shortUrl: shortUrl,
//             clicks: 0
//         });
//         res.redirect('/success');
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const MostrarUrls = async (req, res) => {
//     try {
//         const userId = req.session.userId;
//         const userUrls = await Url.findAll({ where: { userId: userId } });
//         res.render('listaURL', { userUrls: userUrls });
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const incrementarContador = async (req, res) => {
//     try {
//         const urlId = req.params.id;
//         const url = await Url.findByPk(urlId);
//         if (url) {
//             url.clicks += 1;
//             await url.save();
//             res.redirect(url.origUrl);
//         } else {
//             res.status(404).send('URL no encontrada');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const todasUrls = async (req, res) => {
//     try {
//         const urls = await Url.findAll({
//             attributes: ['id', 'userId', 'origUrl', 'shortUrl', 'clicks', 'createdAt', 'updatedAt']
//         });
//         res.render('listaUrl', { userUrls: urls });
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const editarUrl = async (req, res) => {
//     try {
//         const { shortUrl } = req.body;
//         const userId = req.session.userId;
//         const existingUrl = await Url.findOne({ where: { shortUrl: shortUrl, userId: userId } });

//         if (!existingUrl) {
//             return res.status(404).json({ error: 'URL no encontrada' });
//         }
//         const newShortenedId = nanoid(6);
//         existingUrl.shortUrl = newShortenedId;
//         await existingUrl.save();
//         res.redirect('/success');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al editar la URL' });
//     }
// };