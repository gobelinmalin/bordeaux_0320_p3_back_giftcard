const express = require('express');
const connection = require('../config');
const router = express.Router();


// GET shops
router.get('/', (req, res) => {
    const nameCountry = req.query.country;
    const nameCity = req.query.city;
    // filter by country = get shops by country
    if(nameCountry) {
        const countryFilter = 'SELECT * FROM shop AS s JOIN shop_country AS sc ON s.id = sc.id_shop JOIN country AS c ON c.id = sc.id_country WHERE c.name = ?';
        connection.query(`${countryFilter}`, nameCountry, (err, result) => {
            if(err) {
                res.status(500).json('Erreur lors de la récupération des enseignes selon un pays')
            } else {
                res.status(200).json(result)
            }
        })
    // filter by city = get shops by city
    } else if(nameCity) {
        const cityFilter = 'SELECT * FROM shop AS s JOIN shop_city AS sc ON s.id = sc.id_shop JOIN city AS c ON c.id = sc.id_city WHERE c.name_city = ?';
        connection.query(`${cityFilter}`, nameCity, (err, result) => {
            if(err) {
                res.status(500).json('Erreur lors de la récupération des enseignes selon une ville')
            } else {
                res.status(200).json(result)
            }
        })
    } else {
        // get all shops
        connection.query('SELECT * FROM shop', (err, result) => {
            if (err) {
                res.status(500).json('Error retrieving shops')
            } else {
                res.status(200).send(result)
            }
        })
    }
});

//GET shop by ID
router.get('/:idShop', (req, res) => {
    const { idShop } = req.params;

    connection.query('SELECT * FROM shop WHERE id = ?', [idShop], (err, result) => {
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
    
    // 'SELECT p.*, c.* FROM card AS c JOIN product AS p ON p.id = c.id_product JOIN shop AS s ON p.id_shop = s.id WHERE s.id = ? AND p.id = ?'
    connection.query('SELECT * FROM product WHERE id_shop = ? AND id = ?', [idShop, idProduct], (err, result) => {
        if (err) {
            res.status(500).json('Error retrieve a product from a shop');
        } else {
            res.status(200).json(result);
        }
    })
});

//Get all tags of one shop with it's id
router.get('/:idShop/tags', (req, res) => {
    connection.query('SELECT * FROM tag AS t JOIN shop_tag AS st ON t.id = st.id_tag JOIN shop AS s ON s.id = st.id_shop WHERE s.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération des tags d\'une enseigne')
        } else {
            res.json(result)
        }
    })
});

//Get all cities of one shop with it's id
router.get('/:idShop/cities', (req, res) => {
    connection.query('SELECT * FROM city AS c JOIN shop_city AS sc ON c.id = sc.id_city JOIN shop AS s ON s.id = sc.id_shop WHERE s.id = ?',req.params.idShop, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération des villes liées à une enseigne')
        } else {
            res.json(result)
        }
    })
});

// POST a new shop
router.post('/', (req, res) => {
    const formData = req.body;
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
            res.status(500).json('Erreur lors de la création d\'une jointure enseigne - pays');
        } else {
            res.sendStatus(200);
        }
    })
});

// POST one shop with one city
router.post('/:idShop/cities/:idCity', (req, res) => {
    const { idShop, idCity } = req.params;
    connection.query('INSERT INTO shop_city (id_city, id_shop) VALUES(?, ?)', [idCity, idShop], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la création d\'une jointure enseigne - ville');
        } else {
            res.sendStatus(200);
        }
    })
});

// POST one shop with one tag (jointure)
router.post('/:idShop/tags/:idTag', (req, res) => {
    const { idShop, idTag } = req.params;
    connection.query('INSERT INTO shop_tag (id_tag, id_shop) VALUES(?, ?)', [idTag, idShop], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la création d\'une jointure enseigne - tag');
        } else {
            res.sendStatus(200);
        }
    })
});

// UPDATE a shop by its ID
router.put('/:idShop', (req,res) => {
    const formData = req.body;
    const { idShop } = req.params;

    connection.query('UPDATE shop SET ? WHERE id = ?', [formData, idShop], (err) => {
        if(err) {
            res.status(500).json('Error updating a shop')
        } else {
            res.status(200).json('Shop updated')
        }
    })
})


// DELETE a shop
router.delete('/:idShop', (req, res) => {
    const { idShop } = req.params;

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
            res.status(500).json('Error deleting the shop join with one country')
        } else {
            res.status(200).json('Shop deleted')
        }
    })
});

// DELETE one city of one shop
router.delete('/:idShop/cities/:idCity', (req, res) => {
    const { idShop, idCity } = req.params;
    connection.query('DELETE FROM shop_city WHERE id_shop = ? AND id_city = ?', [idShop, idCity], (err, result) => {
        if (err) {
            res.status(500).json('Error deleting the city_shop')
        } else {
            res.status(200).json('city_shop deleted')
        }
    })
});

// DELETE one tag shop with it's ID
router.delete('/:idShop/tags/:idTag', (req, res) => {
    const { idShop, idTag } = req.params;
    connection.query('DELETE FROM shop_tag WHERE id_shop = ? AND id_tag = ?', [idShop, idTag], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la suppression d\'une jointure enseigne - tag')
        } else {
            res.sendStatus(200)
        }
    })
});

module.exports = router;