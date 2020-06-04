const express = require("express");
const clients = require('./clients');
const customizations = require('./customizations');
const shops = require('./shops')

const router = express.Router();

router.use('/clients', clients);
router.use('/customizations', customizations);
router.use('/shops', shops);

module.exports = router;
