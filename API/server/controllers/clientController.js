const db = require('../models/db');

exports.getAllClients = (req, res) => {
    const query = 'SELECT * FROM Clients';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createClient = (req, res) => {
    const { clientName, email, phone } = req.body;
    const query = 'INSERT INTO Clients (ClientName, Email, Phone) VALUES (?, ?, ?)';
    db.query(query, [clientName, email, phone], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Cliente creado exitosamente.' });
    });
};

exports.updateClient = (req, res) => {
    const { clientId } = req.params;
    const { clientName, email, phone } = req.body;
    const query = 'UPDATE Clients SET ClientName = ?, Email = ?, Phone = ? WHERE ClientID = ?';
    db.query(query, [clientName, email, phone, clientId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Cliente actualizado exitosamente.' });
    });
};

exports.deleteClient = (req, res) => {
    const { clientId } = req.params;
    const query = 'DELETE FROM Clients WHERE ClientID = ?';
    db.query(query, [clientId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Cliente eliminado exitosamente.' });
    });
};