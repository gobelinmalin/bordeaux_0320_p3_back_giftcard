const express = require('express');
const connection = require('../config')
const router = express.Router();

// GET all cards
router.get('/', (req, res) => {
    connection.query('SELECT * FROM card', (err, result) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de toutes les cartes');
        } else {
            res.json(result);
        }
    });
})

// GET all cards from one shop
 router.get('/shop/:idShop', (req, res) => {
    const { idShop } = req.params;
    connection.query('SELECT * FROM card JOIN product ON card.id_product = product.id JOIN shop ON shop.id = product.id_shop WHERE shop.id= ?', [idShop], (err, result) => {
        if(err) {
            res.status(500).send('Error retrieving cards')
        } else if (result.length ===0) {
            res.status(400).send('No cards for that shop')
        } else {
            res.status(200).json(result)        }
    })
});


// GET all e-cards from one shop
router.get('/shop/:idShop/ecards', (req, res) => {
    const { idShop } = req.params

    connection.query('SELECT * FROM card JOIN product ON card.id_product = product.id JOIN shop ON shop.id = product.id_shop WHERE shop.id= ? AND format = 1', [idShop], (err, result) => {
        if(err) {
            res.status(500).send('Error retrieving cards')
        } else if (result.length ===0) {
            res.status(400).send('No cards for that shop')
        } else {
            res.status(200).json(result)
        }
    })
})

// GET all real cards from one shop
router.get('/shop/:idShop/realcards', (req, res) => {
    const { idShop } = req.params

    connection.query('SELECT * FROM card JOIN product ON card.id_product = product.id JOIN shop ON shop.id = product.id_shop WHERE shop.id= ? AND format = 0', [idShop], (err, result) => {
        if(err) {
            res.status(500).send('Error retrieving cards')
        } else if (result.length ===0) {
            res.status(400).send('No cards for that shop')
        } else {
            res.status(200).json(result)
        }
    })
})


// POST one card
router.post('/', (req, res) => {
    const formData = req.body
    connection.query('INSERT INTO card SET ?', [formData], (err, result) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'une carte');
        } else {
            res.sendStatus(200);
        }
    })
});

// PUT one card shop
router.put('/:id', (req, res) => {
    const body = req.body;
    const idCard = req.params.id;
    connection.query('UPDATE card SET ? WHERE id = ?', [body, idCard], (err, results) => {
        if(err) {
            res.status(500).send('Erreur lors de la modification d\'une carte');
        } else {
            return res.status(200).json(results);
        }
    })
});

// DELETE one card shop
router.delete('/:id', (req, res) => {
    const idCard = req.params.id;
    connection.query('DELETE FROM card WHERE id = ?', idCard, (err, result) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression d\'une carte');
        } else {
            res.sendStatus(200);
        }
    })
});

module.exports = router;