const jwt = require('jsonwebtoken');

function auth(req, res, next){
    if (typeof req.session.user === "undefined"){
        return res.redirect('/login');
    } next()

    // const { authorization } = req.headers;
    // const [bearer, token] = authorization.split(' ');

    // if(!authorization){
    //     return res
    //         .status(401)
    //         .render('login', {message: 'Usuário não logado!'});
    // };

    // if(!/Bearer/i.test(bearer)){
    //     return res
    //         .status(401)
    //         .render('login', {message: 'Chave mal formada!'});
    // };

    // try {
    //     const tokenValid = jwt.verify(token, 'c2VyaWFsV2ViVG9rZW4=');
    //     req.token = tokenValid;
    //     next()
    // } catch (error) {
    //     res
    //         .status(401)
    //         .render('login', {message: error});
    // }

}

module.exports = auth;