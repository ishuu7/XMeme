const { response } = require('express');
const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

const getMemesController = require('../controllers/getMemesController');
const postMemesController = require('../controllers/postMemesController');
const editMemesController = require('../controllers/editMemesController');

router.get('/', getMemesController.getAllMemes);

router.get('/:id', getMemesController.getAMeme);

router.post('/', postMemesController.postMeme);

router.patch('/:id', editMemesController.editMeme);


module.exports = router;