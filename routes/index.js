//import modules
const express = require("express");

const clients = require('./clients');
const tags = require('./tags');
const products = require('./products');
const customizations = require('./customizations');
const countries = require('./countries');
const categories = require('./categories');
const order_clients = require('./order_clients');

const router = express.Router();

router.use('/clients', clients);
router.use('/products', products);
router.use('/tags', tags);
router.use('/customizations', customizations);
router.use('/categories', categories);
router.use('/order_clients', order_clients);
router.use('/countries', countries);

module.exports = router;
