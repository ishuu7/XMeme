const Meme = require('../models/Meme');
const editMemesController = require('./editMemesController');

module.exports = {
    deleteMeme: async(req, res) => {
        try {
            const myQuery = { id: req.params.id };
            const response = await Meme.deleteOne(myQuery, function(err, obj) {
                if(err)
                    throw err;
                res.sendStatus(200);
            })
        } catch (error) {
            res.sendStatus(404);
        }
    }
}