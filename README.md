# API Gestão de Vendas

Sistema de gestão de vendas expandido (Clientes, Produtos, Usuários e Pedidos) construído com Node.js, Express e MySQL.

## Configuração do Ambiente

1. Certifique-se de ter o Node.js e o MySQL instalados.
2. Clone o repositório.
3. Na pasta `api-clientes`, crie um arquivo `.env` baseado no arquivo `.env.example`.
4. Instale as dependências executando:
   ```bash
   cd api-clientes
   npm install
   ```

## Configuração do Banco de Dados

1. Execute o dump inicial do banco de dados (por exemplo, `dump-sistema_clientes-202609252138.sql`) para criar o banco e as tabelas `clientes` e `produtos`.
2. Em seguida, execute o script localizado em `api-clientes/script_banco.sql` no seu banco MySQL. Esse script irá:
   - Criar as novas tabelas: `usuarios`, `pedidos` e `itens_pedido`.
   - Inserir dados iniciais para testes.

## Rodando a Aplicação

Para iniciar o servidor em ambiente de desenvolvimento, utilize:

```bash
cd api-clientes
npm run dev
```

O servidor será iniciado na porta definida no seu arquivo `.env` (padrão: 3000).

## Testes das Rotas (Endpoints)

Na raiz do repositório, você encontrará o arquivo `Sistema de vendas.postman_collection.json`.
Importe esse arquivo no Postman ou Insomnia para testar todos os endpoints das rotas (Clientes, Produtos, Usuários e Pedidos).
