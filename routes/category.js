const express = require('express');
const router = express.Router()
const connection = require('../config');

/* all categories */
router.get('/categories', (req, res) => {

    connection.query('SELECT * FROM category', (error, results) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            return res.status(200).json(results)
        }
    })
})

/* all categories by id*/

module.exports = router


