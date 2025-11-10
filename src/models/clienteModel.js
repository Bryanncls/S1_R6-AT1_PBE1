const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?;';
        const [rows] = await pool.query(sql, [idCliente]);
        return rows;
    },

    selecionarPorCpf: async (cpfCliente) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente = ?;';
        const [rows] = await pool.query(sql, [cpfCliente]);
        return rows;
    },

    inserirCliente: async (nomeCliente, cpfCliente) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (?, ?);';
        const values = [nomeCliente, cpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    atualizarCliente: async (idCliente, nomeCliente, cpfCliente) => {
        const sql = 'UPDATE clientes SET nomeCliente = ?, cpfCliente = ? WHERE idCliente = ?;';
        const values = [nomeCliente, cpfCliente, idCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletarCliente: async (idCliente) => {
        const sql = 'DELETE FROM clientes WHERE idCliente = ?;';
        const [rows] = await pool.query(sql, [idCliente]);
        return rows;
    }
};

module.exports = { clienteModel };
