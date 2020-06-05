const express = require('express');
const connection = require('../config');
const router = express.Router();

/* GET all orders of one client*/
router.get('/:idClient/orders', (req, res) => {

    const { idClient } = req.params

    connection.query('SELECT * FROM `order` AS o LEFT JOIN `client` AS c ON c.id = o.id_client WHERE c.id = ?',
        idClient, (err, results) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(results)
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

            res.status(200).json(results[0])
        }
    })
})

module.exports = router