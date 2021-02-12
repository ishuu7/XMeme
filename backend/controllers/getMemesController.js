const Meme = require('../models/Meme');

const modifyData = (data) => {
    data = data.reverse().slice(0, 100);
    const modifiedData = data.map((curr) => {
        const modifiedFieldObj = {
            "id": curr.id,
            "name": curr.name,
            "url": curr.url,
            "caption": curr.caption,
            
        }
        return modifiedFieldObj;
    });
    return modifiedData;
};


const modifyJson = (data) => {
    const modifiedData = {
        "id": data.id,
        "name": data.name,
        "url": data.url,
        "caption": data.caption,
    };
    return modifiedData;
};


module.exports = {
    getAllMemes: async (req, res) => {
        try {
            const data = await Meme.find();
            const modifiedData = modifyData(data);  
            res.status(200).json(modifiedData);
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
    },

    getAMeme: async (req, res) => {
        try {
            const data = await Meme.findOne({id: req.params.id});
            const modifiedJson = modifyJson(data);
            res.status(200).json((modifiedJson));
        } catch (error) {
            res.sendStatus(404);
        }
    }
}
