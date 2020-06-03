const express = require("express");
const clients = require('./clients');
const countries = require('./countries');

const router = express.Router();

router.use('/clients', clients);
router.use('/countries', countries);

module.exports = router;
