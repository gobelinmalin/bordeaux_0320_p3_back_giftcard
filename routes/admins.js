const express = require("express");
const connection = require("../config");

const router = express.Router();

// get all admins
router.get("/", (req, res) => {
    connection.query("SELECT * FROM admin", (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(
                `Erreur lors de la récupération des administrateurs`
            );
        } else {
            res.json(results);
        }
    });
});

// get one admin
router.get("/:idAdmin", (req, res) => {
    const { idAdmin } = req.params;
    connection.query(
        "SELECT * FROM admin WHERE id = ?",
        [idAdmin],
        (err, results) => {
            if (err) {
                res.status(500).send(
                    `Erreur lors de la récupération d'un administrateur`
                );
            }
            if (results.length === 0) {
                res.status(404).send(`Administrateur introuvable`);
            } else {
                res.json(results[0]);
            }
        }
    );
});

// post one admin
router.post("/", (req, res) => {
    const idAdmin = req.body;
    connection.query("INSERT INTO admin SET ?", [idAdmin], (err, results) => {
        if (err) {
            res.status(500).send(
                `Erreur lors de la création d'un administrateurs`
            );
        } else {
            res.sendStatus(200);
        }
    });
});

// put one admin
router.put("/:idAdmin", (req, res) => {
    const { idAdmin } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE admin SET ? WHERE id = ?",
        [formData, idAdmin],
        (err) => {
            if (err) {
                res.status(500).send(
                    `Erreur lors de la création d'un administrateur`
                );
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// delete one admin
router.delete("/:idAdmin", (req, res) => {
    const { idAdmin } = req.params;
    connection.query("DELETE FROM admin WHERE id = ?", [idAdmin], (err) => {
        if (err) {
            res.status(500).send(`Impossible d'effacer cet administrateur`);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
