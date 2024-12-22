const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);
router.put('/:clientId', clientController.updateClient);
router.delete('/:clientId', clientController.deleteClient);

module.exports = router;