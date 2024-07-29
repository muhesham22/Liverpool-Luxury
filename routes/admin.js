const express = require('express');
const router = express.Router();

const carcontroller = require('../controllers/admin');
const authing = require('../middlewares/authing');
const {isAdmin} = require('../middleware/isadmin');
const carvalidation = require('../validation/car');

router.post('/', authing, isAdmin, carvalidation.requires(), carvalidation.isProduct(), carcontroller.PostCar);
