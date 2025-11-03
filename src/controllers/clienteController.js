const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const Cliente = await clienteModel.selecionarTodos();
            res.status(200).json(Cliente);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            res.status(500).json({ message: 'Erro ao buscar clientes', error });
        }
    },

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (!nomeCliente || !cpfCliente) {
                return res.status(400).json({ message: 'Nome e CPF são obrigatórios!' });
            }

            const clienteExistente = await clienteModel.selecionarTodos(cpfCliente);
            if (clienteExistente.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado!' });
            }

            const result = await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            res.status(201).json({
                message: 'Cliente criado com sucesso!',
                id: result.insertId
            });

        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({ message: 'Erro ao criar cliente', error });
        }
    }
};

module.exports = { clienteController };
