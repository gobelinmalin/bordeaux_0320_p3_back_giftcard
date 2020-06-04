const express = require('express');
const connection = require('../config');
const router = express.Router()

router.get('/products/client/:idClient', (req, res) => {

    //GET all the favorite products of one client by it's ID.
    connection.query('SELECT * FROM favorite_product AS f JOIN product AS p ON f.id_product = p.id WHERE id_client = ?', req.params.idClient, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.status(200).json(result)
        }
    })
})

router.post('/client/:idClient/product/:idProduct', (req, res) => {
    const { idClient, idProduct} = req.params

    //POST a new favorite with the id of a client pair with the id of the product.
    connection.query('INSERT INTO favorite_product (id_client, id_product) VALUES(?, ?)', [idClient, idProduct], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.status(200).json(result)
        }
    })
})

router.put('/client/:idClient/product/:idProduct', (req, res) => {
    const { idClient, idProduct} = req.params
    //PUT a favorite row specified with it's id_client and id_product, SET with req.body values
    connection.query('UPDATE favorite_product SET ? WHERE id_client = ? AND id_product = ?', [req.body, idClient, idProduct], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.status(200).json(result)
        }
    })
})

router.delete('/client/:idClient/product/:idProduct', (req, res) => {
    const { idClient, idProduct } = req.params
    //DELETE a favorite with it's idClient and it's idProduct
    connection.query('DELETE FROM favorite_product WHERE id_client = ? AND id_product = ?', [idClient, idProduct], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.sendStatus(200)
        }
    })
})

module.exports = router