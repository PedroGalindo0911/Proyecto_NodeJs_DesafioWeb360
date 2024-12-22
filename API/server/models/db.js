const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '', //En blanco para que usted coloque su usuario, no lo puse en un .env porque no se iba a subir y no sabia si ustedes uban a crear el archivo
    password: '', //En blanco para que usted coloque su contraseña
    database: 'GDA00143OT_PedroGalindo'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;