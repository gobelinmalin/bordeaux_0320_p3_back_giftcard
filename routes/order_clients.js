const express = require('express');
const connection = require('../config');
const router = express.Router();

/* GET all orders from one client*/
router.get('/:id/orders', (req, res) => {

    const { id } = req.params

    connection.query('SELECT * FROM `order` AS o JOIN `client` AS c ON o.id_client = c.id WHERE c.id = ?',
        id, (err, results) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(results)
            }
        })

})

/* GET one order of one client */

router.get('/:id/orders/:id', (req, res) => {

    const { id } = req.params

    connection.query('SELECT * FROM `order` AS o JOIN `client` AS c ON o.id_client = c.id WHERE o.id = ?',
        id, (err, results) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(results)
            }
        })


})

// /* POST one order by a client */ UTILE?
/* router.post('/:id/orders', (req, res) => {

    const { id } = req.params
    const { body } = req

    connection.query(`INSERT INTO \`order\` AS o SET ? WHERE o.id_client = ${id}`, [body, id], (err, result) => {
        if (err) {
            res.status(500).send('L\' ordre n\'as pas pu être ajouté')
        } else {
            res.status(200).json({ status: 'succes' })
        }
    })
}) */


module.exports = router