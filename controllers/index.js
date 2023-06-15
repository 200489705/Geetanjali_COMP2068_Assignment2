module.exports.home = function(req,res,next) {
    res.render('home');
}

module.exports.about = function(req,res,next) {
    res.render('about');
}

module.exports.contact = function(req,res,next) {
    res.render('contact');
}