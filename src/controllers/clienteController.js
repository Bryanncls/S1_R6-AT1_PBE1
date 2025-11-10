const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            res.status(500).json({ message: 'Erro ao buscar clientes', error });
        }
    },

    buscarClientePorId: async (req, res) => {
        try {
            const id = Number(req.query.idCliente);
            if (!id || isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido!' });
            }
            const cliente = await clienteModel.selecionarPorId(id);
            if (cliente.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado!' });
            }
            res.status(200).json(cliente[0]);
        } catch (error) {
            console.error('Erro ao buscar cliente por ID:', error);
            res.status(500).json({ message: 'Erro ao buscar cliente por ID', error });
        }
    },

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;
            if (!nomeCliente || !cpfCliente) {
                return res.status(400).json({ message: 'Nome e CPF são obrigatórios!' });
            }
            const clienteExistente = await clienteModel.selecionarPorCpf(cpfCliente);
            if (clienteExistente.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado!' });
            }
            const result = await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            res.status(201).json({ message: 'Cliente criado com sucesso!', id: result.insertId });
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({ message: 'Erro ao criar cliente', error });
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            const { nomeCliente, cpfCliente } = req.body;
            if (!id || isNaN(id) || !nomeCliente || !cpfCliente) {
                return res.status(400).json({ message: 'Dados inválidos!' });
            }
            const cliente = await clienteModel.selecionarPorId(id);
            if (cliente.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado!' });
            }
            await clienteModel.atualizarCliente(id, nomeCliente, cpfCliente);
            res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ message: 'Erro ao atualizar cliente', error });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido!' });
            }
            const cliente = await clienteModel.selecionarPorId(id);
            if (cliente.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado!' });
            }
            await clienteModel.deletarCliente(id);
            res.status(200).json({ message: 'Cliente deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            res.status(500).json({ message: 'Erro ao deletar cliente', error });
        }
    }
};

module.exports = { clienteController };
