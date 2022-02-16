//Insere o módulo de express
const express = require("express");

//Implementa o package cors para utilizar HTTP
const cors = require("cors"); //entender melhor

//Variável responsável pela execução do Express
const app = express();

//Permite o express entender as requisições JSON da API
app.use(express.json()); //JSON arquivo utilizado para transferir informações entre sistemas.

//Permite a comunicação entre aplicações por HTTP
app.use(cors());

//Insere estrutura rotas
app.use("/", require("./src/routes/routes"));

//Insere estrutura rotas usuário
app.use("/usuario", require("./src/routes/user.routes"));

//Insere estrutura EJS
app.set("view engine", "ejs");

//Insere estrutura pasta views
app.set("views", "./src/views");

//Insere estrutura pasta public
app.use(express.static("public"));

//Define a porta que servidor irá funcionar
app.listen(3000, () => console.log("Servidor Funcionando!"));

// // variavel de erro
// var createError = require("http-errors");
// //Pegar erro 404 e encaminhar ao controle de erro
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// //controle de erro para o servidor
// app.use(function (err, req, res, next) {
//   res.local.message = err.message;
//   res.locals.error = req.app.get("env" === "development" ? err : {});
//   //renderização para a pagina de erro
//   res.status(err.status || 500);
//   res.render("error");
// });

// para criar e relacionar caminhos (padrão)
var path = require("path");

