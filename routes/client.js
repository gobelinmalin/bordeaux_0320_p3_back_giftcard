const express = require('express');
const connection = require('../config')
const router = express.Router();


//GET all the clients;
router.get('/', (req, res) => {
    connection.query('SELECT * FROM client', (err, result)=> {
        console.log(err)
        if (err) {
            res.status(500).json('Erreur lors de la récupéation des clients')
        } else {
            res.status(200).json(result)
        }
    })
})

//GET one client with it's ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM client WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la sélection d\'un client')
        } else {
            if (result[0] == undefined) {
                res.json('Wrong id')
            } else {
                res.status(200).json(result)
            }
            
        }
    })
})


//POST a new client
router.post('/', (req, res) => {
    connection.query('INSERT INTO client SET ?', [req.body], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de l\'insertion d\'un client')
        } else {
            res.status(200).json({status: 'success'})
        }
    })
})

//PUT a client with it's ID
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    connection.query('UPDATE client SET ? WHERE id = ?', [body, id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'un client')
        } else {
            connection.query('SELECT * FROM client WHERE id = ?', id, (err2, result2) => {
                if (err) {
                    res.status(500).json('Erreur lors de la récupération du client')
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
})


//DELETE a client with it's ID.
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM client WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la supression d\'un client')
        } else {
            res.status(200).json('Client supprimé')
        }
    })
})

module.exports = router