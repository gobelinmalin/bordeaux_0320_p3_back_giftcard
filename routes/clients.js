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

/////////////////////////////////////////////////////// Favorites Product //////////////////////////////////////////////////////////

router.get('/:idClient/favorites', (req, res) => {

    //GET all the favorite products of one client by it's ID.
    connection.query('SELECT * FROM favorite_product AS f JOIN product AS p ON f.id_product = p.id WHERE id_client = ?', req.params.idClient, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.status(200).json(result)
        }
    })
})

router.post('/:idClient/products/:idProduct/favorites', (req, res) => {
    const { idClient, idProduct} = req.params

    //POST a new favorite with the id of a client pair with the id of the product.
    connection.query('INSERT INTO favorite_product (id_client, id_product) VALUES(?, ?)', [idClient, idProduct], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.sendStatus(200)
        }
    })
})

router.put('/:idClient/products/:idProduct/favorites', (req, res) => {
    const { idClient, idProduct} = req.params
    const formData = req.body
    //PUT a favorite row specified with it's id_client and id_product, SET with req.body values
    connection.query('UPDATE favorite_product SET ? WHERE id_client = ? AND id_product = ?', [formData, idClient, idProduct], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else  {
            res.sendStatus(200)
        }
    })
})

router.delete('/:idClient/products/:idProduct/favorites', (req, res) => {
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
