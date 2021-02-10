const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
require('dotenv/config');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const memeRoute = require('./routes/meme');
app.use('/memes', memeRoute);


app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(process.env.PORT || 8081);