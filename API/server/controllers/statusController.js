const db = require('../models/db');

exports.getAllStatuses = (req, res) => {
    const query = 'SELECT * FROM Status';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createStatus = (req, res) => {
    const { statusName } = req.body;
    const query = 'INSERT INTO Status (StatusName) VALUES (?)';
    db.query(query, [statusName], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Estado creado exitosamente.' });
    });
};

exports.updateStatus = (req, res) => {
    const { statusId } = req.params;
    const { statusName } = req.body;
    const query = 'UPDATE Status SET StatusName = ? WHERE StatusID = ?';
    db.query(query, [statusName, statusId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Estado actualizado exitosamente.' });
    });
};

exports.deleteStatus = (req, res) => {
    const { statusId } = req.params;
    const query = 'DELETE FROM Status WHERE Status ID = ?';
    db.query(query, [statusId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Estado eliminado exitosamente.' });
    });
};