const jwt = require('jsonwebtoken');
const config = { jwtSecret: 'ljdghtyiponbu65y' };

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token no proporcionado.');

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido.');
        req.userId = decoded.id;
        next();
    });
};

module.exports = auth;