const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all the customizations
router.get('/', (req, res) => {
    connection.query('SELECT * FROM customization', (err, result)=> {
        console.log(err)
        if (err) {
            res.status(500).json('Erreur lors de la récupéation des customisations');
        } else {
            res.status(200).json(result);
        }
    });
});

// POST a new customization
router.post('/', (req, res) => {
    connection.query('INSERT INTO customization SET ?', [req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'une customisation');
        } else {
            res.sendStatus(200);
        }
    });
});

// PUT a customization with it's ID
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    connection.query('UPDATE customization SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'une customisation');
        } else {
            connection.query('SELECT * FROM customization WHERE id = ?', id, (err2, result2) => {
                if (err2) {
                    res.status(500).json('Erreur lors de la récupération de la customisation');
                } else {
                    res.status(200).json(result2);
                }
            });
        }
    });
});

// DELETE a customization with it's ID.
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM customization WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la supression d\'une customisation');
        } else {
            res.status(200).json('Customisation supprimée');
        }
    });
});

module.exports = router;