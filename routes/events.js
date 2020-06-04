const express = require('express');
const connection = require('../config')
const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM event', (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.params
    connection.query('SELECT * FROM event',[id], (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(result)
        }
    })
})


router.post('/', (req, res) => {
    const formData=req.body
    connection.query('INSERT INTO event SET ?', [formData], (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.sendStatus(200)
        }
     })
})

router.put('/:id', (req, res) => {
    const id = req.params;
    const formData = req.body;
    connection.query('UPDATE event SET ? WHERE id = ?',[formData, id], (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            connection.query('SELECT * FROM event WHERE id = ?', [id], (err2, result2) => {
                if (err2) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params;
    connection.query('DELETE FROM event WHERE id = ?', [id], (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.sendStatus(200)
        }
    })
})

module.exports=router