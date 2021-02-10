const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('DB connected');
    }
);