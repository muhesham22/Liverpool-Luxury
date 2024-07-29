const path = require('path');

const express = require("express");
const bp = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


//requiring routes
const adminroutes = require('./routes/admin')


const multerConfig = require('./config/multer');

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bp.json());
app.use(multer({
    storage: multerConfig.fileStorage, fileFilter: multerConfig.fileFilter
}).array('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());

//using routes
app.use('/admin',adminroutes)

mongoose.connect(process.env.MONGODB_URL).then((result) => {
    app.listen(process.env.PORT, () => {
        console.log('App listening on port', process.env.PORT);
    });
}).catch((err) => {
    console.log(err);
});