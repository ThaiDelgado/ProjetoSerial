function userLogado(req, res, next){
    if (typeof req.session.user === "undefined"){
        return res.redirect('homepage')
    } next()
}

module.exports = userLogado;