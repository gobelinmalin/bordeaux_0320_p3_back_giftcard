const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config');

const router = express.Router()

// create user client
router.post('/signup', [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
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

//create user adminshop
router.post('/signup/admin', [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    const formData = {
        email: req.body.email,
        password: hash,
        id_shop: req.body.id_shop
    };
    connection.query('SELECT * FROM adminshop WHERE email = ?', [formData.email], (err, result) => {
        if (result.length === 0) {

            connection.query('INSERT INTO adminshop SET ?', [formData], (err2, result2) => {
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

//create user super-admin
router.post('/signup/superadmin', [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    const formData = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
    };
    connection.query('SELECT * FROM admin WHERE email = ?', [formData.email], (err, result) => {
        if (result.length === 0) {

            connection.query('INSERT INTO admin SET ?', [formData], (err2, result2) => {
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

// create token client
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

// create token adminshop
router.post('/login/admin', (req, res) => {
    const formData = {
        email: req.body.email,
        password: req.body.password,
    };

    connection.query('SELECT * FROM adminshop WHERE email = ?', [formData.email], (err, user) => {
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

//create token super-admin
router.post('/login/superadmin', (req, res) => {
    const formData = {
        email: req.body.email,
        password: req.body.password,
    };

    connection.query('SELECT * FROM admin WHERE email = ?', [formData.email], (err, user) => {
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