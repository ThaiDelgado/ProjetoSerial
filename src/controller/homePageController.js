

module.exports = {
    home(req,res){
        res.render('homePage');
    },

    cadastro(req, res){
        res.render('cadastro')
    },

    login(req,res){
        res.render('login')
    },

    passwordDiscovery(req, res){
        res.render('passwordDiscovery')
    }

};