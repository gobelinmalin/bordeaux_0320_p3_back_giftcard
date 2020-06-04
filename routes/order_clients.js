const express = require('express');
const connection = require('../config');
const router = express.Router();

/* get all orders from one client*/

router.get('/:id/orders', (req, res) => {
    // res.send(console.log("hello Grégory"));
    // http://localhost:3000/api/clients/:id/orders

        const { id } = req.params

        connection.query('SELECT * FROM `order` AS o JOIN `client` AS c ON c.id = o.id_client WHERE c.id = ?',
            id, (err, results) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(results)
                }
            })

})

module.exports = router