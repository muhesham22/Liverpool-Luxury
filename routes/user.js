const express = require('express');
const router = express.Router();
const userDocsController = require('../controllers/user-docs')

router.patch('/documents/:type',userDocsController.manageDocs)

module.exports = router;