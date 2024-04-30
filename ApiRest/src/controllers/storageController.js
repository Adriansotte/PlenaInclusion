const StorageModel = require("../models/storageModel");
const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
    const data = await StorageModel.findAll({});
    res.send({ data });
}

const createItem = async (req, res) => {
    const { body, file } = req;
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await StorageModel.create(fileData);
    res.send( data );
}

module.exports = {
    getItems: getItems,
    createItem: createItem
}