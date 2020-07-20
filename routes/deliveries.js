const express = require('express');
const connection = require('../config')
const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM delivery', (err, result) => {
        if(err){
            res.status(500).json('Erreur lors de la récupération de tous les deliveries')
        }else{
            res.status(200).json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM delivery WHERE id = ?',[id], (err, result) => {
        if(err){
            res.status(500).json('Erreur lors de la récupération d\'un événement')
        }else{
            res.status(200).json(result)
        }
    })
})


router.post('/', (req, res) => {
    const formData=req.body;
    connection.query('INSERT INTO delivery SET ?', [formData], (err, result) => {
        if(err){
            res.status(500).json('Erreur lors de la création d\'un delivery')
        }else{
            res.sendStatus(200)
        }
     })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const formData = req.body;
    connection.query('UPDATE delivery SET ? WHERE id = ?',[formData, id], (err, result) => {
        if(err){
            res.status(500).json('Erreur lors de la modification d\'un delivery')
        }else{
            connection.query('SELECT * FROM delivery WHERE id = ?', [id], (err2, result2) => {
                if (err2) {
                    res.status(500).json('Erreur lors de la récupération d\'un delivery modifié')
                } else {
                    res.status(200).json(result2)
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM delivery WHERE id = ?', [id], (err, result) => {
        if(err){
            res.status(500).json('Erreur lors de la suppression d\'un delivery')
        }else{
            res.sendStatus(200)
        }
    })
})

module.exports=router