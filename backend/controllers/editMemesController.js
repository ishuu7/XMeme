const Meme = require('../models/Meme');

module.exports = {
    editMeme: async(req, res) => {
        try {
            const data = await Meme.findOne(
                { id: req.params.id }
            )
            const myQuery = { id: req.params.id };
            const updatedUrl = req.body.hasOwnProperty('url') ? req.body.url : data.url;

            const updatedCaption =  req.body.hasOwnProperty('caption') ? req.body.caption : data.caption;

            const newValue = {
                $set: {
                    id: data.id,
                    name: data.name,
                    url: updatedUrl,
                    caption: updatedCaption,
            } };
            const updatedMeme = await Meme.updateOne(myQuery, newValue, function(err) {
                if (err) {
                    res.sendStatus(404);
                }
            });
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(404);
        }
    }
}