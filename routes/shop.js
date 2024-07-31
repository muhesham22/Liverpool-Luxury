const express = require('express');
const router = express.Router();

const shopcontroller = require('../controllers/shop');

// router.get('/',shopcontroller.viewAll)

// router.get('/details/:carId',shopcontroller.viewOne)

router.get('/',shopcontroller.search)

router.get('/:keyword',shopcontroller.filter)










module.exports = router;