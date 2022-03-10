//Insere o módulo de express
const express = require("express");

//Implementa Session
const session = require('express-session');

//Implementa o package cors para utilizar HTTP
const cors = require("cors"); //entender melhor

//Adicona method-override
const methodOverride = require('method-override');

//Variável responsável pela execução do Express
const app = express();

app.use(session({
    secret: "Serial's Project - Secrete Phrase",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false 
    }
}));

const multer  = require('multer')
const upload = multer({ dest: 'uploads/data' })

//Permite o express entender as requisições JSON da API
app.use(express.json()); //JSON arquivo utilizado para transferir informações entre sistemas.

app.use(express.urlencoded({ extended: false }));

//Insere estrutura pasta public
app.use(express.static("public"));

app.use(methodOverride('_method'));

// app.use(cookieMiddleware);

//Permite a comunicação entre aplicações por HTTP
app.use(cors());


//Insere estrutura rotas
app.use("/", require("./src/routes/homePage.routes"));

//Insere estrutura rotas usuário
app.use("/usuario", require("./src/routes/user.routes"));

//Insere estrutura rotas explorar 
app.use("/explorar", require("./src/routes/explorar.routes"));

//Insere estrutura rotas de serie
app.use("/serie", require("./src/routes/serie.routes"));

//Insere estrutura rotas de calendario 
app.use("/calendario", require("./src/routes/callendar.routes"));

//Insere estrutura EJS
app.set("view engine", "ejs");

//Insere estrutura pasta views
app.set("views", "./src/views");


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
app.post('/multer', upload.single('avatarFile'), (req, res) => {
  console.log(req.file) // Irá devolver um objeto com as informações do arquivo
  res.send('Upload feito com sucesso!')
})


app.use((req, res) => {
  res.status(404).render('error404');
})