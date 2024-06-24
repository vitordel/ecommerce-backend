const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu aplicativo!');
});

sequelize.sync()
  .then(() => {
    console.log('Banco de dados conectado e modelos sincronizados.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });