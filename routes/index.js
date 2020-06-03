const express = require("express");
const clients = require('./clients');
const customizations = require('./customizations');
const fonts = require('./fonts');

const router = express.Router();

router.use('/clients', clients);
router.use('/customizations', customizations);
router.use('/fonts', fonts);

module.exports = router;
