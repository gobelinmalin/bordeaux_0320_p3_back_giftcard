const express = require('express');
const connection = require('../config');
const router = express.Router();

// GET all fonts
router.get('/', (req, res) => {
    connection.query('SELECT * FROM font', (err, result)=> {
        console.log(err)
        if (err) {
            res.status(500).json('Erreur lors de la récupéation des fonts');
        } else {
            res.status(200).json(result);
        }
    });
});

// POST one font
router.post('/', (req, res) => {
    connection.query('INSERT INTO font SET ?', [req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'une font');
        } else {
            res.sendStatus(200);
        }
    });
});

// PUT a font with it's ID
router.put('/:id', (req, res) => {
    const formData = req.body;
    const id = req.params;
    connection.query('UPDATE font SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'une font');
        } else {
            connection.query('SELECT * FROM font WHERE id = ?', id, (err2, result2) => {
                if (err2) {
                    res.status(500).json('Erreur lors de la récupération de la font');
                } else {
                    res.status(200).json(result2);
                }
            });
        }
    });
});

// DELETE a font with it's ID.
router.delete('/:id', (req, res) => {
    const id = req.params;
    connection.query('DELETE FROM font WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la supression d\'une font');
        } else {
            res.status(200).json('Font supprimée');
        }
    });
});


module.exports = router;
