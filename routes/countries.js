const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all countries
router.get('/', (req, res) => {
    connection.query('SELECT * FROM country', (err, result)=> {
        console.log(err)
        if (err) {
            res.status(500).json('Erreur lors de la récupération des pays')
        } else {
            res.status(200).json(result)
        }
    })
})

// POST a country
router.post('/', (req, res) => {
    connection.query('INSERT INTO country SET ?', [req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'un pays')
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router;