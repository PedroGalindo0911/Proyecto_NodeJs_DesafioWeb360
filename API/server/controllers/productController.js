const db = require('../models/db');

exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM Products';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createProduct = (req, res) => {
    const { productName, categoryId, price } = req.body;
    const query = 'INSERT INTO Products (ProductName, CategoryID, Price) VALUES (?, ?, ?)';
    db.query(query, [productName, categoryId, price], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Producto creado exitosamente.' });
    });
};

exports.updateProduct = (req, res) => {
    const { productId } = req.params;
    const { productName, categoryId, price } = req.body;
    const query = 'UPDATE Products SET ProductName = ?, CategoryID = ?, Price = ? WHERE ProductID = ?';
    db.query(query, [productName, categoryId, price, productId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Producto actualizado exitosamente.' });
    });
};

exports.deleteProduct = (req, res) => {
    const { productId } = req.params;
    const query = 'DELETE FROM Products WHERE ProductID = ?';
    db.query(query, [productId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Producto eliminado exitosamente.' });
    });
};