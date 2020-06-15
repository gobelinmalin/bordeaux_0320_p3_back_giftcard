const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all admin shop
router.get('/', (req, res) => {
    connection.query('SELECT * FROM adminshop', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// POST one admin shop
router.post('/', (req, res) => {
    const formData = req.body
    connection.query('INSERT INTO adminshop set ?', [formData], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    })
});

// PUT one admin shop
router.put('/:id', (req, res) => {
    const body = req.body;
    const idAdmin = req.params.id;
    connection.query('UPDATE adminshop SET ? WHERE id = ?', [body, idAdmin], (err, results) => {
        if(err) {
            res.status(500).send(err);
        } else {
            return res.status(200).json(results);
        }
    })
});

// DELETE one admin shop
router.delete('/:id', (req, res) => {
    const idAdmin = req.params.id;
    connection.query('DELETE FROM adminshop WHERE id = ?', idAdmin, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    })
});

module.exports = router;