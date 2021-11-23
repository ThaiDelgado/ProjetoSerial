//Insere o módulo de express
const express = require('express');

//Variável responsável pela execução do Express
const app = express();

//Insere estrutura rotas
app.use('/', require('./src/routes/routes'));

//Insere estrutura EJS
app.set('view engine', 'ejs');

//Insere estrutura pasta views
app.set('views', './src/views');

//Insere estrutura pasta public
app.use(express.static('public'));

//Permite o express entender as requisições JSON da API
app.use(express.json());

//Define a porta que servidor irá funcionar
app.listen(3000, ()=> console.log('Servidor Funcionando!'));