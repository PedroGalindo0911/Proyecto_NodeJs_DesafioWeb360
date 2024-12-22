const db = require('../models/db');

exports.getAllOrders = (req, res) => {
    const query = 'SELECT * FROM Orders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createOrder = (req, res) => {
    const { clientId, orderDate } = req.body;
    const query = 'INSERT INTO Orders (ClientID, OrderDate) VALUES (?, ?)';
    db.query(query, [clientId, orderDate], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Orden creada exitosamente.', orderId: results.insertId });
    });
};

exports.updateOrder = (req, res) => {
    const { orderId } = req.params;
    const { clientId, orderDate } = req.body;
    const query = 'UPDATE Orders SET ClientID = ?, OrderDate = ? WHERE OrderID = ?';
    db.query(query, [clientId, orderDate, orderId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Orden actualizada exitosamente.' });
    });
};

exports.deleteOrder = (req, res) => {
    const { orderId } = req.params;
    const query = 'DELETE FROM Orders WHERE OrderID = ?';
    db.query(query, [orderId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Orden eliminada exitosamente.' });
    });
};

// Detalles de la orden
exports.getOrderDetails = (req, res) => {
    const { orderId } = req.params;
    const query = 'SELECT * FROM OrderDetails WHERE OrderID = ?';
    db.query(query, [orderId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).json(results);
    });
};

exports.createOrderDetail = (req, res) => {
    const { orderId, productId, quantity } = req.body;
    const query = 'INSERT INTO OrderDetails (OrderID, ProductID, Quantity) VALUES (?, ?, ?)';
    db.query(query, [orderId, productId, quantity], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(201).send({ message: 'Detalle de orden creado exitosamente.' });
    });
};

exports.updateOrderDetail = (req, res) => {
    const { detailId } = req.params;
    const { orderId, productId, quantity } = req.body;
    const query = 'UPDATE OrderDetails SET OrderID = ?, ProductID = ?, Quantity = ? WHERE DetailID = ?';
    db.query(query, [orderId, productId, quantity, detailId], (err, results) => {
        if (err) return res.status(500).send(' Error en la base de datos.');
        res.status(200).send({ message: 'Detalle de orden actualizado exitosamente.' });
    });
};

exports.deleteOrderDetail = (req, res) => {
    const { detailId } = req.params;
    const query = 'DELETE FROM OrderDetails WHERE DetailID = ?';
    db.query(query, [detailId], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        res.status(200).send({ message: 'Detalle de orden eliminado exitosamente.' });
    });
};