const express = require('express');
const clienteRoutes = express.Router();
const { clienteController } = require('../controllers/clienteController');

clienteRoutes.get('/cliente', clienteController.buscarTodosClientes);
clienteRoutes.get('/cliente/id', clienteController.buscarClientePorId);
clienteRoutes.post('/cliente', clienteController.criarCliente);
clienteRoutes.put('/cliente/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/cliente/:idCliente', clienteController.deletarCliente);

module.exports = { clienteRoutes };
