const { v4: uuidv4 } = require('uuid');
const Meme = require('../models/Meme');

module.exports = {
    postMeme: async (req, res) => {
        const currObject = {
            name: req.body.name,
            url: req.body.url,
            caption: req.body.caption
        }
        const isThereAnotherMeme = await Meme.findOne(currObject);
        if(isThereAnotherMeme) {
            res.sendStatus(409).send('Conflict');
        }
        else {
            const newMeme = new Meme({
                name: req.body.name,
                url: req.body.url,
                caption: req.body.caption,
                id: uuidv4(),
            });
            try {
                const savedMeme = await newMeme.save();
                res.status(200).send( { "id": savedMeme.id });
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        }
    }
}