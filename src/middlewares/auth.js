function auth(req, res, next){
    if (typeof req.session.userId === "undefined"){
        return res.redirect('/login');
    } next()
}

module.exports = auth;