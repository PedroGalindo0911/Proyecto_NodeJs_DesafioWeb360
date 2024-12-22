const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const statusRoutes = require('./routes/statusRoutes');
const clientRoutes = require('./routes/clientRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});