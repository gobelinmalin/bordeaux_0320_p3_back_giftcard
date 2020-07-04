const express = require("express");
const connection = require("../config");
const router = express.Router();

//GET all the clients;
router.get("/", (req, res) => {
  connection.query("SELECT * FROM client", (err, result) => {
    console.log(err);
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//GET one client with it's ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM client WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de la sélection d'un client");
    } else {
      if (result[0] == undefined) {
        res.json("Wrong id");
      } else {
        res.status(200).json(result);
      }
    }
  });
});

// GET all orders of one client
router.get('/:idClient/orders', (req, res) => {
    const { idClient } = req.params;
    const sql = 'SELECT o.*, c.id AS clientid FROM `order` AS o JOIN `client` AS c ON c.id = o.id_client WHERE c.id = ?';

    connection.query(sql, idClient, (err, results) => {

        if (err) {
            res.status(500).json('Erreur lors de la récupération de toutes les commandes d\'un client')
        } else {
            res.status(200).json({ orders_client: results })
        }
    })
});

// GET one order of one client
router.get("/:idClient/orders/:idOrder", (req, res) => {
  const { idClient, idOrder } = req.params;
  const sql = "SELECT * FROM `order` AS o LEFT JOIN client AS c ON o.id_client = c.id WHERE c.id = ? AND o.id = ?";

  connection.query(sql, [idClient, idOrder], (err, results) => {
    if (err) {
      res.status(500).json("Erreur lors de la récupération d'une commande d'un client");
    } else if (results.length === 0) {
      res.status(400).send(" La commande du client est inexistante");
    } else {
      res.status(200).json({ order_client: results });
    }
  });
});

// GET all products of one order of one client
router.get("/:idClient/orders/:idOrder/products", (req, res) => {
  const { idClient, idOrder } = req.params;
  const sql =
    "SELECT o.id AS commande_nb , c.firstname , c.lastname , p.* FROM product p JOIN `order` o ON o.id = p.id_order JOIN client c ON c.id = o.id_client WHERE o.id = ? AND c.id = ?";

  connection.query(sql, [idOrder, idClient], (err, results) => {
    if (err) {
      res.status(500).json("Erreur lors de la récupération de tous les produits d'une commande d'un client");
    } else if (results.length === 0) {
      res.status(400).send(" Il n'y aucun produit dans la commande");
    } else {
      res.status(200).json({ products_order_client: results });
    }
  });
});

// GET one product of one order of one client
router.get("/:idClient/orders/:idOrder/products/:idProduct", (req, res) => {
  const { idClient, idOrder, idProduct } = req.params;
  const sql =
    "SELECT o.id AS commande_nb , c.firstname , c.lastname , p.name as product FROM `product` p JOIN product_order po ON p.id = po.id_product JOIN `order` o ON o.id = po.id_order JOIN `client` c ON c.id = o.id_client WHERE o.id = ? AND c.id = ? AND p.id = ?";

  connection.query(sql, [idClient, idOrder, idProduct], (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de la récupération d'un produit d'une commande d'un client");
    } else if (result === 0) {
      res.status(400).send("Le produit que vous avez n'existe pas");
    } else {
      res.json({ product_order_client: result });
    }
  });
});

//POST a new client
router.post("/", (req, res) => {
  const formBody = req.body;
  connection.query("INSERT INTO client SET ?", [formBody], (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de l'insertion d'un client");
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});

//PUT a client with it's ID
router.put("/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  connection.query("UPDATE client SET ? WHERE id = ?", [body, id], (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de la modification d'un client");
    } else {
      connection.query("SELECT * FROM client WHERE id = ?", id, (err2, result2) => {
        if (err) {
          res.status(500).json("Erreur lors de la récupération du client");
        } else {
          res.status(200).json(result2);
        }
      });
    }
  });
});

//DELETE a client with it's ID.
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM client WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de la supression d'un client");
    } else {
      res.status(200).json("Client supprimé");
    }
  });
});

/////////////////////////////////////////////////////// Favorites Product //////////////////////////////////////////////////////////

router.get("/:idClient/favorites", (req, res) => {
  const idClient = req.params.idClient;
  //GET all the favorite products of one client by it's ID.
  connection.query(
    "SELECT * FROM favorite_product AS f JOIN product AS p ON f.id_product = p.id WHERE id_client = ?",
    idClient,
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la récupération de tous les produits favoris d'un client");
      } else {
        res.status(200).json(result);
      }
    }
  );
});

router.post("/:idClient/products/:idProduct/favorites", (req, res) => {
  const { idClient, idProduct } = req.params;

  //POST a new favorite with the id of a client pair with the id of the product.
  connection.query(
    "INSERT INTO favorite_product (id_client, id_product) VALUES(?, ?)",
    [idClient, idProduct],
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la création de jointure d'un produit en favori d'un client");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.put("/:idClient/products/:idProduct/favorites", (req, res) => {
  const { idClient, idProduct } = req.params;
  const formData = req.body;
  //PUT a favorite row specified with it's id_client and id_product, SET with req.body values
  connection.query(
    "UPDATE favorite_product SET ? WHERE id_client = ? AND id_product = ?",
    [formData, idClient, idProduct],
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la modification de jointure d'un produit favori d'un client");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/:idClient/products/:idProduct/favorites", (req, res) => {
  const { idClient, idProduct } = req.params;
  //DELETE a favorite with it's idClient and it's idProduct
  connection.query(
    "DELETE FROM favorite_product WHERE id_client = ? AND id_product = ?",
    [idClient, idProduct],
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la suppresion d'un produit favori d'un client");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

/////////////////////////////////////////////////////// Favorites shops //////////////////////////////////////////////////////////

//GET all the favorite shops of one client by it's ID
router.get("/:idClient/favorites/shops", (req, res) => {
  const { idClient } = req.params;
  connection.query(
    "SELECT * FROM favorite_shop AS f JOIN shop AS s ON f.id_shop = s.id WHERE id_client = ?",
    [idClient],
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la récupération de toutes les enseignes favorites d'un client");
      } else {
        res.status(200).json(result);
      }
    }
  );
});

//POST a new favorite with the id of a client pair with the id of the shop (jointure)
router.post("/:idClient/favorites/shops/:idShop", (req, res) => {
  const { idClient, idShop } = req.params;
  connection.query("INSERT INTO favorite_shop (id_client, id_shop) VALUES(?, ?)", [idClient, idShop], (err, result) => {
    if (err) {
      res.status(500).json("Erreur lors de la création de d'une jointure enseigne favorite d'un client");
    } else {
      res.sendStatus(200);
    }
  });
});

//DELETE a favorite shop for one client
router.delete("/:idClient/favorites/shops/:idShop", (req, res) => {
  const { idClient, idShop } = req.params;
  connection.query(
    "DELETE FROM favorite_shop WHERE id_client = ? AND id_shop = ?",
    [idClient, idShop],
    (err, result) => {
      if (err) {
        res.status(500).json("Erreur lors de la suppresion d'une enseigne favorite d'un client");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
