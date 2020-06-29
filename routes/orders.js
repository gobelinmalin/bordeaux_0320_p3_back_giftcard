const express = require('express');
const connection = require('../config');

const router = express.Router();

// get all orders
router.get('/', (req, res) => {
    connection.query('SELECT * FROM `order`', (err, results) => {
        if(err){
            console.log(err);
            res.status(500).send('Erreur lors de la récupération des commandes');
        } else {
            res.json(results);
        }
    });
});

// get product order on the month 
router.get('/products', (req, res) => {
    connection.query('SELECT * FROM product AS p JOIN `order` AS o ON p.id_order = o.id WHERE MONTH(o.createDate) = MONTH(NOW())', (err, results) =>  {
        if(err){
            res.status(500).send('Erreur lors de la récupération des produits commandés dans le mois')
        }
        if (results.length === 0) {
            res.status(404).send('produits non trouvés')
        } else {
            res.json(results);
        }
    })
});

// get one order
router.get('/:id', (req, res) => {
    const oneOrder = req.params.id;
    connection.query('SELECT * FROM `order` WHERE id = ?', [oneOrder], (err, results) => {
        if(err){
            console.log(err);
            res.status(500).send(`Erreur lors de la récupération de la commande ${oneOrder}`);
        } 
        if (results.length === 0) {
            res.status(404).send('Commande non trouvée')
        } else {
            res.json(results[0]);
        }
    });
});

// post one order
router.post('/', (req, res) => {
    const addOrder = req.body;
    connection.query('INSERT INTO `order` SET ?', addOrder, (err, results) => {
        if(err) {
            res.status(500).send('Erreur lors de la sauvegarde de la commande');
        } else {
            res.sendStatus(200);
        }
    });
});

// put one order
router.put('/:id', (req, res) => {
    const idOrder = req.params.id;
    const formData = req.body;
    connection.query('UPDATE `order` SET ? WHERE id = ?', [formData, idOrder], err => {
        if(err) {
            res.status(500).send(`Erreur lors de la modification de la commande ${idOrder}`);
        } else {
            res.sendStatus(200);
        }
    });
});

// delete one order
router.delete('/:id', (req, res) => {
    const idOrder = req.params.id;
    connection.query('DELETE FROM `order` WHERE id = ?', [idOrder], err => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression de la commande')
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
