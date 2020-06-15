const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all themes;
router.get('/', (req, res) => {

    connection.query('SELECT * FROM theme', (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération des thèmes')
        } else {
            res.status(200).json(result)
        }
    })
})

// POST one theme;
router.post('/', (req, res) => {

    connection.query('INSERT INTO theme SET ?', req.body, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'un thème')
        } else {
            res.status(200).json({ status: 'success' })
        }
    })
})

// PUT one theme;
router.put('/:id', (req, res) => {

    const { body } = req
    const { id } = req.params

    connection.query('UPDATE theme SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification du thème')
        } else {
            res.status(200).json({ status: 'success' })
        }
    })
})

// DELETE one theme with it's ID.
router.delete('/:id', (req, res) => {
    const { id } = req.params
    connection.query('DELETE FROM theme WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la suppression du thème')
        } else {
            res.status(200).json('Thème supprimé')
        }
    })
})

module.exports = router