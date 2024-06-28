
module.exports.isLoggedIn = (req, res, next) => {
    if(req.xhr && !req.isAuthenticated()){
        return res.status(400).json({
            success:true,
            msg:'Not authorized!'
        })
    }

    if(!req.isAuthenticated()){
        req.flash('error', 'Plz Login first');
        return res.redirect('/login');
    }
    next();
}

module.exports.isSeller = (req, res, next) => {
    if(req.user.role !== 'seller'){
        req.flash('error', 'Not Authorized person');
        return res.redirect('back')
    }

    next();
}