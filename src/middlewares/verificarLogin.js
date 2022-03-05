const {validationResult} = require('express-validator');

function verificarLogin(req, res, next){
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      res.redirect('/');
   } else{
      next(); // 
   }
}

module.exports= verificarLogin;