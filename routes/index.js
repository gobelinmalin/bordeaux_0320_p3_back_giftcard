//import modules
const express = require("express");

const clients = require('./clients');
const tags = require('./tags');
const products = require('./products');
const customizations = require('./customizations');
const shops = require('./shops');
const fonts = require('./fonts');
const countries = require('./countries');
const categories = require('./categories');
const orders = require('./orders');
const events =require('./events');
const auth = require('./auth');
const colors = require('./colors');
const themes = require('./themes');
const adminShop = require('./adminShop');

const router = express.Router();

router.use('/clients', clients);
router.use('/tags', tags);
router.use('/products', products);
router.use('/customizations', customizations);
router.use('/shops', shops);
router.use('/fonts', fonts);
router.use('/countries', countries);
router.use('/categories', categories);
router.use('/orders', orders);
router.use('/events', events);
router.use('/auth', auth);
router.use('/colors', colors);
router.use('/themes', themes);
router.use('/admin', adminShop);

module.exports = router;