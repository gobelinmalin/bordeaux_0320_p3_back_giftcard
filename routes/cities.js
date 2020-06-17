const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all cities
router.get('/', (req, res) => {
    connection.query('SELECT * FROM city', (err, result)=> {
        console.log(err)
        if (err) {
            res.status(500).json('Erreur lors de la récupération des villes')
        } else {
            res.status(200).json(result)
        }
    })
})

// POST a city
router.post('/', (req, res) => {
    connection.query('INSERT INTO city SET ?', [req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'une ville')
        } else {
            res.sendStatus(200);
        }
    })
})

//PUT a city with it's ID
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    connection.query('UPDATE city SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'une ville')
        } else {
            connection.query('SELECT * FROM city WHERE id = ?', id, (err2, result2) => {
                if (err) {
                    res.status(500).json('Erreur lors de la récupération de la ville')
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
});

//DELETE a city with it's ID.
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM city WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la supression d\'une ville')
        } else {
            res.status(200).json('Ville supprimée')
        }
    })
})


module.exports = router;