USE sistema_clientes;

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL UNIQUE,
 senha VARCHAR(255) NOT NULL,
 perfil ENUM('admin', 'operador') DEFAULT 'operador',
 status ENUM('ativo', 'inativo') DEFAULT 'ativo',
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 cliente_id INT NOT NULL,
 data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 status ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente',
 valor_total DECIMAL(10, 2) DEFAULT 0.00,
 FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
);

-- 3. Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
 id INT AUTO_INCREMENT PRIMARY KEY,
 pedido_id INT NOT NULL,
 produto_id INT NOT NULL,
 quantidade INT NOT NULL,
 preco_unitario DECIMAL(10, 2) NOT NULL,
 FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
 FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT
);

-- Dados iniciais para teste
INSERT INTO usuarios (nome, email, senha, perfil, status) VALUES
('Admin Inicial', 'admin@vendas.com', 'admin123', 'admin', 'ativo'),
('Operador', 'operador@vendas.com', 'op123', 'operador', 'ativo');
