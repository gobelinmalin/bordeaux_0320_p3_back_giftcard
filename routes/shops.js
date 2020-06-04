const express = require('express');
const connection = require('../config');
const router = express.Router();


// GET shops
router.get('/', (req, res) => {
    // filter by country = get shops by country
    const nameCountry = req.query.country;
    if(nameCountry) {
        const countryFilter = 'SELECT * FROM shop AS s JOIN shop_country AS sc ON s.id = sc.id_shop JOIN country AS c ON c.id = sc.id_country WHERE c.name = ?';
        connection.query(`${countryFilter}`, nameCountry, (err, result) => {
            if(err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }
        })
    // get all shops    
    } else {
        connection.query('SELECT * FROM shop', (err, result) => {
            console.log(err)
            if (err) {
                res.status(500).send('Error retrieving shops')
            } else {
                res.status(200).send(result)
            }
        })
    }
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

// GET one product of one shop
router.get('/:idShop/products/:idProduct', (req, res) => {
    const { idShop, idProduct } = req.params;
    
    // 'SELECT * FROM product AS p JOIN shop AS s ON p.id_shop = s.id WHERE s.id = ? AND p.id = ?'
    connection.query('SELECT * FROM product WHERE id_shop = ? AND id = ?', [idShop, idProduct], (err, result) => {
        if (err) {
            res.status(500).json('Error retrieve a product from a shop');
        } else {
            res.status(200).json(result);
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

// POST one shop with one country
router.post('/:idShop/countries/:idCountry', (req, res) => {
    const { idShop, idCountry } = req.params;
    connection.query('INSERT INTO shop_country (id_country, id_shop) VALUES(?, ?)', [idCountry, idShop], (err, result) => {
        if (err) {
            res.status(500).json('Error adding a new shop');
        } else {
            res.sendStatus(200);
        }
    })
})

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
    const idShop = req.params.id;

    connection.query('DELETE FROM shop WHERE id = ?', [idShop] ,(err, result) => {
        if (err) {
            res.status(500).json('Error deleting the shop')
        } else {
            res.status(200).json('Shop deleted')
        }
    })
})

// DELETE one country of one shop
router.delete('/:idShop/countries/:idCountry', (req, res) => {
    const { idShop, idCountry } = req.params;
    connection.query('DELETE FROM shop_country WHERE id_shop = ? AND id_country = ?', [idShop, idCountry], (err, result) => {
        if (err) {
            res.status(500).json('Error deleting the shop')
        } else {
            res.status(200).json('Shop deleted')
        }
    })
})


module.exports = router;