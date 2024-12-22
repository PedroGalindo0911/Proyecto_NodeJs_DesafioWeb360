const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = { jwtSecret: 'ljdghtyiponbu65y' };

// Registrar un nuevo usuario
exports.register = (req, res) => {
    const { roleID, statusID, email, fullName, password, phone, birthDate } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO Users (RoleID, StatusID, Email, FullName, Password, Phone, BirthDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [roleID, statusID, email, fullName, hashedPassword, phone, birthDate], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        res.status(201).send({ message: 'Usuario creado exitosamente.' });
    });
};

// Iniciar sesión
exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Users WHERE Email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.Password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: 'Contraseña inválida.' });
        }

        const token = jwt.sign({ id: user.UserID }, config.jwtSecret, { expiresIn: 86400 }); // 24 horas
        res.status(200).send({ id: user.UserID, email: user.Email, accessToken: token });
    });
};

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        res.status(200).json(results);
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM Users WHERE UserID = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }
        res.status(200).json(results[0]);
    });
};

// Actualizar un usuario
exports.updateUser  = (req, res) => {
    const { userId } = req.params;
    const { roleID, statusID, email, fullName, password, phone, birthDate } = req.body;
    const hashedPassword = password ? bcrypt.hashSync(password, 8) : undefined;

    const query = 'UPDATE Users SET RoleID = ?, StatusID = ?, Email = ?, FullName = ?, Password = ?, Phone = ?, BirthDate = ? WHERE UserID = ?';
    db.query(query, [roleID, statusID, email, fullName, hashedPassword, phone, birthDate, userId], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        res.status(200).send({ message: 'Usuario actualizado exitosamente.' });
    });
};

// Eliminar un usuario
exports.deleteUser  = (req, res) => {
    const { userId } = req.params;
    const query = 'DELETE FROM Users WHERE UserID = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos.');
        }
        res.status(200).send({ message: 'Usuario eliminado exitosamente.' });
    });
};