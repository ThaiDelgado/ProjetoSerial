const fs = require('fs');

function logCadastro(req, res, next) {
    fs.appendFileSync("log.txt", "Foi criado um registro na url: " + req.url + " na data: " + new Date() + "\n");
    next();
}
module.exports = logCadastro;