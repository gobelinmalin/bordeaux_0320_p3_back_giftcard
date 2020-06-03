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

//PUT a country with it's ID
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    connection.query('UPDATE country SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'un pays')
        } else {
            connection.query('SELECT * FROM country WHERE id = ?', id, (err2, result2) => {
                if (err) {
                    res.status(500).json('Erreur lors de la récupération du client')
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
});

//DELETE a country with it's ID.
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM country WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la supression d\'un pays')
        } else {
            res.status(200).json('Pays supprimé')
        }
    })
})


module.exports = router;