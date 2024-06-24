# Ecommerce Backend
Este é um projeto de backend para gerenciar pedidos e produtos em um sistema de ecommerce. Ele utiliza Node.js, Express, PostgreSQL como banco de dados relacional e Sequelize como ORM.

## Configuração
### Clone o repositório:

git clone git@github.com:vitordel/ecommerce-backend.git
cd ecommerce-backend

### Instale as dependências:

npm install

### Configure o banco de dados:

Certifique-se de ter o PostgreSQL instalado e configurado localmente ou em um servidor remoto.
Crie um banco de dados PostgreSQL para o projeto.


### Executar as migrações:

npx sequelize-cli db:migrate

Isso irá aplicar as migrações necessárias para criar as tabelas no banco de dados.

### Iniciar o servidor:

npm start

O servidor estará rodando em http://localhost:3000