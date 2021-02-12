const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');



require('dotenv/config');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const memeRoute = require('./routes/meme');
app.use('/memes', memeRoute);

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', async (req, res) => {
    res.send('Home Page');
});

app.listen(process.env.PORT || 8081);