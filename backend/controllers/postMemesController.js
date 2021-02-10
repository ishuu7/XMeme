const { v4: uuidv4 } = require('uuid');
const Meme = require('../models/Meme');

module.exports = {
    postMeme: async (req, res) => {
        const newMeme = new Meme({
            name: req.body.name,
            url: req.body.url,
            caption: req.body.caption,
            id: uuidv4(),
        });
        try {
            const savedMeme = await newMeme.save();
            res.json( { "id": savedMeme.id });
        } catch (error) {
            res.json( {"msg": error });
        }
    }
}