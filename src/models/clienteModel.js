const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    inserirCliente: async (nomeCliente, cpfCliente) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (?, ?);';
        const values = [nomeCliente, cpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    buscarCpf: async (cpfCliente) => {
        const sql = 'SELECT * FROM Clientes WHERE cpf = ?;';
        const [rows] = await pool.query(sql, cpf);
        return rows;
      
    }
};

module.exports = { clienteModel };
