const express = require('express');
const connection = require('../config');
const router = express.Router()

/* all categories */
router.get('/', (req, res) => {

    connection.query('SELECT * FROM category', (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
                sql: error.sql
            })
        } else {
            return res.status(200).json(results)
        }
    })
})

router.post('/', (req, res) => {

    const { body } = req

    connection.query('INSERT INTO category SET ?', body, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
                sql: error.sql
            })
        } else {
            return res.status(201).json(results)
        }
    })
})


/* all categories by id*/
router.get('/:id', (req, res) => {

    const { id } = req.params

    connection.query('SELECT * FROM category WHERE id = ?', id, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
                sql: error.sql
            })
        } else {

            return res.status(200).json(results)
        }
    })
})

router.put('/:id', (req, res) => {

    const { body } = req
    const { id } = req.params
    connection.query(`UPDATE category SET ? WHERE id = ?`, [body, id], (error, results) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
                sql: error.sql
            })
        } else {
            return res.status(201).json(results)
        }

    })
})

router.delete('/:id', (req, res) => {

    const { id } = req.params

    connection.query('DELETE FROM category WHERE id = ?', id, (error, results) => {
        if (error) {
            res.status(500).json({
                error: error.message,
                sql: error.sql
            })
        } else {
            res.status(200).json(results)
        }
    })
})

module.exports = router


