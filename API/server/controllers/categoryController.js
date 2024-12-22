const db = require('../models/db');

exports.getAllCategories = (req, res) => {
    const query = 'SELECT * FROM Categories';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createCategory = (req, res) => {
    const { categoryName } = req.body;
    const query = 'INSERT INTO Categories (CategoryName) VALUES (?)';
    db.query(query, [categoryName], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Categoría creada exitosamente.' });
    });
};

exports.updateCategory = (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    const query = 'UPDATE Categories SET CategoryName = ? WHERE CategoryID = ?';
    db.query(query, [categoryName, categoryId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Categoría actualizada exitosamente.' });
    });
};

exports.deleteCategory = (req, res) => {
    const { categoryId } = req.params;
    const query = 'DELETE FROM Categories WHERE CategoryID = ?';
    db.query(query, [categoryId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Categoría eliminada exitosamente.' });
    });
};