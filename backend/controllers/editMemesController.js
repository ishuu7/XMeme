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

            const currObject = {
                name: data.name,
                url: updatedUrl,
                caption: updatedCaption
            }

            const isThereAnotherMeme = await Meme.findOne(
                currObject
            );

            if(isThereAnotherMeme) {
                res.status(409).send('Conflict');
            }
            else {
                const newValue = {
                    $set: currObject
                };

                const updatedMeme = await Meme.updateOne(myQuery, newValue, function(err) {
                    if (err) {
                        res.status(404).send('Meme not found');
                    }
                });
                res.sendStatus(200);
            }
        } catch (error) {
            res.status(404).send('Meme not found');
        }
    }
}