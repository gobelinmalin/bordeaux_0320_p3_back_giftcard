const express = require('express');
const connection = require('../config')
const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM tag', (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de tous les tags')
        } else {
            res.json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM tag WHERE id = ?',req.params.id, (err, result) => {
        if (err) {
            res.status(500).json("Erreur lors de la récupération d\'un tag")
        } else {
            res.json(result)
        }
    })
})

router.post('/', (req, res) => {
    connection.query('INSERT INTO tag SET ?',[req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la création d\'un tag')
        } else {
            res.json('tag added')
        }
    })
})

router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    connection.query('UPDATE tag SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'un tag')
        } else {
            connection.query('SELECT * FROM tag WHERE id = ?', id, (err2, result2) => {
                if (err) {
                    res.status(500).json("'Erreur lors de la récupération du tag modifié")
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM tag WHERE id = ?', req.params.id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la suppression d\'un tag')
        } else {
            res.json({success: 'tag deleted'})
        }
    })
})

module.exports = router;
