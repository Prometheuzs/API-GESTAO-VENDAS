// routes/pedidos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE: Criar um novo pedido
router.post('/', async (req, res) => {
  const { cliente_id, valor_total } = req.body;
  if (!cliente_id) {
    return res.status(400).json({ mensagem: 'cliente_id é obrigatório.' });
  }
  try {
    const [result] = await db.execute(
      'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)',
      [cliente_id, valor_total || 0.00]
    );
    res.status(201).json({ id: result.insertId, cliente_id, status: 'pendente', valor_total: valor_total || 0.00 });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar pedido.', detalhes: error.message });
  }
});

// READ: Listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT p.id, p.cliente_id, p.data_pedido, p.status, p.valor_total,
             c.nome AS cliente_nome, c.email AS cliente_email
      FROM pedidos p
      INNER JOIN clientes c ON p.cliente_id = c.id
    `;
    const [rows] = await db.execute(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar pedidos.', detalhes: error.message });
  }
});

// READ: Buscar pedido completo por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar o pedido e os dados do cliente
    const sqlPedido = `
      SELECT p.*, c.nome AS cliente_nome, c.email AS cliente_email
      FROM pedidos p
      INNER JOIN clientes c ON p.cliente_id = c.id
      WHERE p.id = ?
    `;
    const [pedidos] = await db.execute(sqlPedido, [id]);
    
    if (pedidos.length === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }
    
    // Buscar os itens do pedido
    const sqlItens = `
      SELECT i.*, pr.nome AS produto_nome
      FROM itens_pedido i
      INNER JOIN produtos pr ON i.produto_id = pr.id
      WHERE i.pedido_id = ?
    `;
    const [itens] = await db.execute(sqlItens, [id]);
    
    const pedidoCompleto = {
      ...pedidos[0],
      itens
    };
    
    res.status(200).json(pedidoCompleto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o pedido.', detalhes: error.message });
  }
});

// PATCH /pedidos/:id/status: Alterar apenas o status do pedido
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ mensagem: 'Status é obrigatório.' });
  }
  
  if (!['pendente', 'pago', 'cancelado'].includes(status)) {
    return res.status(400).json({ mensagem: 'Status inválido. Valores permitidos: pendente, pago, cancelado.' });
  }
  
  try {
    const [result] = await db.execute('UPDATE pedidos SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Status do pedido atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar status do pedido.', detalhes: error.message });
  }
});

// POST /pedidos/:id/itens: Adicionar um novo item a um pedido existente
router.post('/:id/itens', async (req, res) => {
  const { id } = req.params;
  const { produto_id, quantidade, preco_unitario } = req.body;
  
  if (!produto_id || !quantidade || !preco_unitario) {
    return res.status(400).json({ mensagem: 'produto_id, quantidade e preco_unitario são obrigatórios.' });
  }
  
  try {
    const [result] = await db.execute(
      'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
      [id, produto_id, quantidade, preco_unitario]
    );
    res.status(201).json({ id: result.insertId, pedido_id: id, produto_id, quantidade, preco_unitario });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao adicionar item ao pedido.', detalhes: error.message });
  }
});

// DELETE /pedidos/:id_pedido/itens/:id_item: Remover um item específico de um pedido
router.delete('/:id_pedido/itens/:id_item', async (req, res) => {
  const { id_pedido, id_item } = req.params;
  
  try {
    const [result] = await db.execute(
      'DELETE FROM itens_pedido WHERE id = ? AND pedido_id = ?', 
      [id_item, id_pedido]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Item não encontrado no pedido especificado.' });
    }
    
    res.status(200).json({ mensagem: 'Item removido do pedido com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao remover item do pedido.', detalhes: error.message });
  }
});

module.exports = router;
