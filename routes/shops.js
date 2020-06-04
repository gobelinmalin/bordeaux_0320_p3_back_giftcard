const express = require('express');
const connection = require('../config');
const router = express.Router();


// GET all shops
router.get('/', (req, res) => {
    connection.query('SELECT * FROM shop', (err, result) => {
        console.log(err)
        if (err) {
            res.status(500).send('Error retrieving shops')
        } else {
            res.status(200).send(result)
        }
    })
});


//GET shop by ID
router.get('/:id', (req, res) => {
    const id = req.params.id

    connection.query('SELECT * FROM shop WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving id selected shop')
        } else if (result.length === 0) {
            res.status(400).send('bad id : shop doesn\'t exist')
        } else {
            res.status(200).json(result)
        }
    })
})


// POST a new shop
router.post('/', (req, res) => {
    const formData = req.body
    connection.query('INSERT INTO shop SET ?', [formData], (err, result) => {
        if (err) {
            res.status(500).json('Error adding a new shop');
        } else {
            res.sendStatus(200);
        }
    });
});


// UPDATE a shop by its ID
router.put('/:id', (req,res) => {
    const formData = req.body;
    const idShop = req.params.id;

    connection.query('UPDATE shop SET ? WHERE id = ?', [formData, idShop], (err) => {
        if(err) {
            res.status(500).json('Error updating a shop')
        } else {
            res.status(200).json('Shop updated')
        }
    })
    
})


// DELETE a shop
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM shop WHERE id = ?', (err, result) => {
        if (err) {
            res.status(500).json('Error deleting the shop')
        } else {
            res.status(200).json('Shop deleted')
        }
    })
})


module.exports = router