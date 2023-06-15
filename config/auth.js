module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Make sure you are authenticated to view this');
        res.redirect('/login');
    }
}