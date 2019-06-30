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
                `SELECT id, url, image
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
        
          app.listen(9000, () => console.log("App listening on port 9000"));