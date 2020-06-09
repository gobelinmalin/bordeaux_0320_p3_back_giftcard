const express = require('express');
const connection = require('../config')
const router = express.Router();



router.get('/', (req, res) => {
    if (req.query.shop) {
        //Get all products from one shop name
        connection.query('SELECT * FROM product AS p JOIN shop AS s ON p.id_shop_product = s.id WHERE s.name = ?', [req.query.shop], (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })


    } else if (req.query.theme) {

        //Get all products from one theme
        connection.query('SELECT * FROM product AS p JOIN theme AS t ON p.id_theme = t.id WHERE t.name = ?', [req.query.theme], (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })

    } else if (req.query.category) {
        //Get all products from one category
        connection.query('SELECT * FROM product AS p JOIN category AS c ON p.id_category = c.id WHERE c.type = ?', [req.query.category], (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    }else {
        //GET all products
        connection.query('SELECT * FROM product', (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }


        })
    }
})

//Get a product by its id
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM product WHERE id = ?',[req.params.id], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
})

//Récupère la catégorie d'un produit selon son ID
router.get('/:idProduct/categories', (req, res) => {
    connection.query('SELECT c.type FROM category AS c JOIN product AS p ON p.id_category = c.id WHERE c.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
})

//Récupère le theme d'un produit selon son ID
router.get('/:idProduct/themes', (req, res) => {
    connection.query('SELECT t.name FROM theme AS t JOIN product AS p ON p.id_theme = t.id WHERE t.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
})

//POST a new product
router.post('/', (req, res) => {
    connection.query('INSERT INTO product SET ?',req.body, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.sendStatus(200)
        }
    })
})

// PUT one product with it's ID
router.put('/:id', (req, res) => {
    connection.query('UPDATE product SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            connection.query('SELECT * FROM product WHERE id = ?', req.params.id, (err2, result2) => {
                if (err2) {
                    res.status(500).json(err2)
                } else {
                    res.json(result2)
                }
            })
        }
    })
})

// DELETE on product with it's ID
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM product WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.sendStatus(200)
        }
    })
})


module.exports = router;