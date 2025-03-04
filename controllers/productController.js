
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const pgConnection = require('../config/pgConnection');



const getProduct = async (req, res) => {
    const client = pgConnection();
    const results = await client.query(`SELECT * from products where id = $1`, [req.params.id]);
    res.status(200).json({ "message": results.rows[0] });
}

const getAllProducts = async (req, res) => {

    const client = pgConnection();
    const results = await client.query('SELECT * FROM products');
    res.status(200).json({ "message": results.rows });

}

const createProduct = async (req, res) => {
    const client = pgConnection();
    let { id, name, price, descr } = req.body;
    price = Number.parseInt(price);
    id = Number.parseInt(id);

    try {
        await client.query(`insert into products (id,name,price,descr) values ($1,$2,$3,$4)`, [id, name, price, descr]);
        res.status(200).json({ "message": "Inserted Successfully", "data": req.body });
    }
    catch (err) {
        res.status(404).json({ "Error": err.message });
    }

}

const deleteProduct = async (req, res) => {
    const client = await pgConnection();
    let id = req.params.id;
    try {

        const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ "message": "The product is not found" });
        }

        await client.query('DELETE FROM products WHERE id = $1', [id]);

        res.status(200).json({ "message": "Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};

const updateProduct = async (req, res) => {
    const client = await pgConnection();
    let { id, name, price, descr } = req.body;
    try {

        const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ "message": "The product is not found" });
        }

        await client.query('DELETE FROM products WHERE id = $1', [id]);

        res.status(200).json({ "message": "Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};
module.exports = { getProduct, getAllProducts, createProduct, deleteProduct }