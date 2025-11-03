const pool = require('../config/db');
const produtoModel = {
/**
 * @async
 * @function selecionarTodos
 * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro da tabela
 * 
 * @example
 * const produtos = await produtoModel.selecionarTodos();
 * console.log(produtos);
 * //saida esperada
 * [
 *      {id_produto: 1, descricao: 'teclado', valor: 150.00},
 *      {id_produto: 1, descricao: 'mouse', valor: 399.99}
 * ]
 */
selecionarTodos: async () => {
    const sql = 'SELECT * FROM produtos;';
    const [rows] = await pool.query(sql);
    return rows;
},
/**
 * seleciona um produto de acordo com o id_produto especificado
 * @async
 * @param {number} pId Indentificador que deve se pesquisado no banco de dados
 * @returns {Promise<Array<object>>}
 * 
 * @example
 * const produto = await produtoModel.selecionarPorId(1);
 * console.log(produto);
 * // Saída esperada
 * [
 *        {id_produto: 1, descricao: 'teclado', valor: 150.00},
 * ]
 */
selecionarPorId: async (pId) => {
    const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
    const values = [pId]
    const [rows] = await pool.query(sql,values);
    return rows;
},
/**
 * Inclui um item novo no banco de dados
 * @param {String} pDescriçao 
 * @param {Number} pValor 
 * @returns {Promise<Object>} Retorna um objeto contendo propriedades que represneta a informações do comando executado
 * @example
 * const produtos = await produto.model.inserirProduto('Produto teste', 16.99);
 * // Saída
 * "result": {
 *      "fieldCount": 0,
 *      "affectedRows" : 1,
 *      "insertID": 11,
 *      "info": "",
 *      "severstatus": 2,
 *      "warningStatus": 0,
 *      "changedRows": 1
 * }
 */
inserirProduto : async (pDescricao, pValor ) => {
    const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?)'
    const values = [pDescricao,pValor];
    const [rows] = await pool.query(sql,values);
    console.log(rows);
    return rows;
    },

alterarProduto: async (pId, pDescricao, pValor) => {
    const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE id_produto=?;'
   const values = [pDescricao, pValor, pId];
   const [rows] = await pool.query(sql, values)
   return rows;
   },

   deleteProduto: async (pId) => {
    const sql = "DELETE FROM produtos WHERE id_produto = ?;" ;
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
   }
}


module.exports = { produtoModel };



