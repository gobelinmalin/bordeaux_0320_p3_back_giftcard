const express = require('express');
const connection = require('../config');
const router = express.Router()

/* all categories */
router.get('categories', (req, res) => {

    connection.query('SELECT * FROM category', (error, results) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            return res.status(200).json(results)
        }
    })
})


router.post('categories', (req, res) => {

    const formData = req.body

    connection.query('INSERT INTO category SET ?', formData, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            return res.status(201).json(results)
        }
    })
})
/* all categories by id*/

module.exports = router


