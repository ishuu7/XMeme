const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
    process.env.NODE_PROD_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('DB connected');
    }
);