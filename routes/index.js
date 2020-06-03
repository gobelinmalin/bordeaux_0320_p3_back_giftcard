const express = require("express");
const clients = require('./clients');
const customizations = require('./customizations');

const router = express.Router();

router.use('/clients', clients);
router.use('/customizations', customizations);

module.exports = router;
