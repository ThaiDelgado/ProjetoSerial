function auth(req, res, next){
    if (typeof req.session.user === "undefined"){
        return res.redirect('/login');
    } next()
}

module.exports = auth;