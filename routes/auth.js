const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config');

const router = express.Router()

// create user
router.post('/signup', (req, res) => {
    const hash = bcrypt.hash(req.body.password, 10);
    const formData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        phone: req.body.phone,
        birthdate: req.body.birthdate
    };
    connection.query('SELECT * FROM client WHERE email = ?', [formData.email], (err, result) => {
        if (result.length === 0) {

            connection.query('INSERT INTO client SET ?', [formData], (err2, result2) => {
                if (err2) {
                    res.status(500).send(err2);
                } else {
                    res.sendStatus(200);
                }
            });
        } else {
            res.status(500).send(err);
        };
    })
});

// create token
router.post('/login', (req, res) => {
    const formData = {
        email: req.body.email,
        password: req.body.password,
    };

    connection.query('SELECT * FROM client WHERE email = ?', [formData.email], (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const isSame = bcrypt.compare(req.body.password, user[0].password)
            if (!isSame) {
                res.status(500).send('Wrong password')
            } else {
                jwt.sign({ user }, 'secretkey', (err, token) => {
                    res.json({ token })
                })
            }
        }
    })
});


router.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authdata) => {
        if (err) {
            res.status(403).send(err)
        } else {
            res.json({
                message: 'Access ok',
                authdata
            })
        }
    })
})


function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1];
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(500)
    }
}


module.exports = router;