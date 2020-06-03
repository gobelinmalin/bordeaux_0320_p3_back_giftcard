//import modules
const express = require("express");
const router = express.Router();

// import route
const clients = require('./clients');
const customizations = require('./customizations');
const categories = require('./category')

// create router
router.use('/clients', clients);
router.use('/customizations', customizations);
router.use('/categories', categories)

module.exports = router;
