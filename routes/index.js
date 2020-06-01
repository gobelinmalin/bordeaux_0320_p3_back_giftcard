const express = require("express");
const client = require('./client')

const router = express.Router();

router.use('/client', client)

module.exports = router;
