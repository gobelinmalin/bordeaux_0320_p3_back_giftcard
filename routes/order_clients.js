const express = require('express');
const connection = require('../config');
const router = express.Router();


router.get('/:id/orders', (req, res) => {
    res.send(console.log("hello Grégory"));
    // http://localhost:3000/api/clients/:id/orders
    connection.query('SELECT * FROM ')
})

module.exports = router