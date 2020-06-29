const express = require('express');
const connection = require('../config');
const router = express.Router();


// GET all colors
router.get('/', (req, res) => {
    connection.query('SELECT * FROM color', (err, result) => {
        if(err) {
            res.status(500).json('Erreur lors de la récupération de toutes les couleurs');
        } else {
            res.status(200).json(result);
        }
    })
})

// GET one color with its ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM color WHERE id = ?', [id], (err, result) => {
        if(err) {
            res.status(500).send("Erreur lors de la récupération d\'une couleur");
        } else if (result.length === 0) {
            res.status(400).send('bad id : color doesn\'t exist')
        } else {
            res.status(200).json(result);
        }
    })
})

// POST one color 
router.post('/', (req,res) => {
    const formData = req.body;
    
    connection.query('INSERT INTO color SET ?', [formData], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la création d\'une nouvelle couleur');
        } else {
            res.status(200).send('color added');
        }
    })
})

// UPDATE one color with its ID
router.put('/:id', (req, res) => {
    const formData = req.body;
    const { id } = req.params;

    connection.query('UPDATE color SET ? WHERE id = ?', [formData, id], (err) => {
        if(err) {
            res.status(500).json('Erreur lors de la modification d\'une couleur')
        } else {
            res.status(200).send('color updated')
        }
    })
} )

// DELETE one color with its ID
router.delete('/:id', (req, res) => {
    const { idColor } = req.params;

    connection.query('DELETE FROM color WHERE id = ?', [idColor], (err, result) => {
        if(err) {
            res.status(500).json("Erreur lors de la suppression d\'une couleur");
        } else {
            res.status(200).json('color deleted')
        }
    })
})

module.exports = router;