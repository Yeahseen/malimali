require("dotenv").config();
const express = require("express");
 const mysql = require("mysql");
  const app = express();
 const pool = mysql.createPool({
    host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASS,
        database: process.env.DB_NAME
 });

 app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

 app.get("/api/customer", (req, res) => {
     pool.query("SELECT id, name, email, username FROM customer", (error, rows) => {
         if (error) {
             return res.status(500).json({ error });
         }

         res.json(rows);
     });
 });
 app.get("/api/customer/:id", (req, res) => {
         pool.query(
             "SELECT id, name, email, address, username FROM customer WHERE id = ?",
             [req.params.id],
             (error, rows) => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 res.json(rows);
             }
         );
     });
     
     app.get("/api/customer/:id/name", (req, res) => {
             pool.query(
                 `SELECT c.name, c.email ,c.address, c.username
                 FROM customer c
                 WHERE c.id = ?
                 ORDER BY c.name`,
                 [req.params.id],
                 (error, rows) => {
                     if (error) {
                         return res.status(500).json({ error });
                     }
        
                     res.json(rows);
                 }
             );
         });

         app.get("/api/item", (req, res) => {
            pool.query("SELECT id, name, description, review, price FROM item", (error, rows) => {
                if (error) {
                    return res.status(500).json({ error });
                }
       
                res.json(rows);
            });
        });
        app.get("/api/item/:id", (req, res) => {
            pool.query(
                "SELECT name, price, description, review FROM item WHERE id = ?",
                [req.params.id],
                (error, rows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
       
                    res.json(rows);
                }
            );
        });
        app.get("/api/item/:id/name", (req, res) => {
            pool.query(
                `SELECT name, price, description ,review
                FROM item
                WHERE id = ?`,
                [req.params.id],
                (error, rows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
       
                    res.json(rows);
                }
            );
        });

        app.get("/api/item_image", (req, res) => {
            pool.query(
                `SELECT image, url, id
                FROM item_image
                WHERE id = ?`,
                [req.params.id],
                (error, rows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
       
                    res.json(rows);
                }
            );
        });

        
        app.post("/api/item", (req, res) => {
                 const item = req.body;
            
                 if (!item.name || !item.price || !item.Description || !item.Review) {
                     return res.status(400).json({ error: "Invalid payload" });
                 }
            
                 pool.query(
                     "INSERT INTO item (name, price, Description, Review) VALUES (?, ?, ?, ?)",
                     [item.name, item.price, item.Description, item.Review],
                     (error, results) => {
                         if (error) {
                             return res.status(500).json({ error });
                         }
            
                         res.json(results.insertId);
                     }
                 );
             });
        
             app.post("/api/customer", (req, res) => {
                const customer = req.body;
           
                if (!customer.name || !customer.email || !customer.address || !customer.username || !customer.password) {
                    return res.status(400).json({ error: "Invalid payload" });
                }
           
                pool.query(
                    "INSERT INTO customer (name, email, address, username, password) VALUES (?, ?, ?, ?, ?)",
                    [customer.name, customer.email, customer.address, customer.username, customer.password],
                    (error, results) => {
                        if (error) {
                            return res.status(500).json({ error });
                        }
           
                        res.json(results.insertId);
                    }
                );
            });

            app.post("/api/item_image", (req, res) => {
                const item_image = req.body;
           
                if (!item_image.image || !item_image.url) {
                    return res.status(400).json({ error: "Invalid payload" });
                }
           
                pool.query(
                    "INSERT INTO item_image (image, url) VALUES (?, ?)",
                    [item_image.image, item_image.url],
                    (error, results) => {
                        if (error) {
                            return res.status(500).json({ error });
                        }
           
                        res.json(results.insertId);
                    }
                );
            });


 app.put("/api/customer/:id", (req, res) => {
         const customer = req.body;
    
         if (!customer.name) {
             return res.status(400).json({ error: "Invalid payload" });
         }
    
         pool.query(
              "UPDATE customer SET name = 'shiundu', email = 'shiundu@gmail.com', username = 'daddy' WHERE id = 3",
             [customer.name, req.params.id],
             (error, results) => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 res.json(results.changedRows);
             }
         );
     });



          app.listen(9000, () => console.log("App listening on port 9000"));