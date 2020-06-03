const router = express.Router();
const express = require("express");

const clients = require('./clients');
const countries = require('./countries');
const customizations = require('./customizations');

router.use('/clients', clients);
router.use('/countries', countries);
router.use('/customizations', customizations);

module.exports = router;
