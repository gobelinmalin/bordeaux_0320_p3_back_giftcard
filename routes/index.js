const express = require("express");
const clients = require('./clients')
const orders = require('./orders')

const router = express.Router();

router.use('/clients', clients)
router.use('/orders', orders)

module.exports = router;