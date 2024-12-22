const db = require('../models/db');

exports.getAllRoles = (req, res) => {
    const query = 'SELECT * FROM Roles';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createRole = (req, res) => {
    const { roleName } = req.body;
    const query = 'INSERT INTO Roles (RoleName) VALUES (?)';
    db.query(query, [roleName], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Rol creado exitosamente.' });
    });
};

exports.updateRole = (req, res) => {
    const { roleId } = req.params;
    const { roleName } = req.body;
    const query = 'UPDATE Roles SET RoleName = ? WHERE RoleID = ?';
    db.query(query, [roleName, roleId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Rol actualizado exitosamente.' });
    });
};

exports.deleteRole = (req, res) => {
    const { roleId } = req.params;
    const query = 'DELETE FROM Roles WHERE RoleID = ?';
    db.query(query, [roleId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Rol eliminado exitosamente.' });
    });
};