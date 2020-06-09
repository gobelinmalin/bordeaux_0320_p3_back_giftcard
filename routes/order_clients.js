const express = require('express');
const connection = require('../config');
const router = express.Router();

/* GET all orders of one client*/
router.get('/:idClient/orders', (req, res) => {

    const { idClient } = req.params;
    const sql = 'SELECT * FROM `order` AS o LEFT JOIN `client` AS c ON c.id = o.id_client WHERE c.id = ?';

    connection.query(sql, idClient, (err, results) => {

        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json({ orders_client: results })
        }
    })
})

/* GET one order of one client */
router.get('/:idClient/orders/:idOrder', (req, res) => {

    const { idClient, idOrder } = req.params
    const sql = 'SELECT * FROM `order` AS o LEFT JOIN client AS c ON o.id_client = c.id WHERE c.id = ? AND o.id = ?'

    connection.query(sql, [idClient, idOrder], (err, results) => {

        if (err) {
            res.status(500).json(err)
        } else if (results.length === 0) {
            res.status(400).send(" La commande du client est inexistante")
        } else {
            res.status(200).json({ order_client: results })
        }
    })
})

/* GET all products of one order of one client */
router.get('/:idClient/orders/:idOrder/products', (req, res) => {

    const { idClient, idOrder } = req.params
    const sql = 'SELECT o.id AS commande_nb , c.firstname , c.lastname , p.name as product FROM `product` p JOIN product_order po ON p.id = po.id_product JOIN `order` o ON o.id = po.id_order JOIN client c ON c.id = o.id_client WHERE o.id = ? AND c.id = ?'

    connection.query(sql, [idClient, idOrder], (err, results) => {

        if (err) {
            res.status(500).json(err)
        } else if (results.length === 0) {
            res.status(400).send(" Il n'y aucun produit dans la commande")
        } else {

            /* res.status(200).json(results.map(prod => {
                const { firstname, lastname, commande_nb, product } = prod
                return `${firstname} ${lastname} ${commande_nb} ${product}`
            })) */

            res.status(200).json({ products_order_client: results })
        }
    })
})

/* GET one product of one order of one client */
router.get('/:idClient/orders/:idOrder/products/:idProduct', (req, res) => {

    const { idClient, idOrder, idProduct } = req.params
    const sql = 'SELECT o.id AS commande_nb , c.firstname , c.lastname , p.name as product FROM `product` p JOIN product_order po ON p.id = po.id_product JOIN `order` o ON o.id = po.id_order JOIN `client` c ON c.id = o.id_client WHERE o.id = ? AND c.id = ? AND p.id = ?'

    connection.query(sql, [idClient, idOrder, idProduct], (err, result) => {

        if (err) {
            res.status(500).json(err)
        } else if (result === 0) {
            res.status(400).send('Le produit que vous avez n\'existe pas')
        } else {
            res.json({ product_order_client: result })
        }
    })
})

module.exports = router