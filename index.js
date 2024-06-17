const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1/shop_db')
    .then((result) => {
        console.log(result);

    }).catch((err) => {
        console.log(err);

    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});