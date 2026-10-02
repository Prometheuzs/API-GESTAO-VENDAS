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

1. Execute o script localizado em `api-clientes/script_banco.sql` na sua ferramenta de banco de dados MySQL (ou similar).
2. Esse script contém a estrutura completa e atualizada e irá:
   - Criar o banco de dados `sistema_clientes`.
   - Criar todas as tabelas necessárias: `clientes`, `produtos`, `usuarios`, `pedidos` e `itens_pedido`.
   - Inserir os dados iniciais essenciais para testes.

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
