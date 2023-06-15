const User = require("../models/schemas/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports.register = function (req, res, next) {
  res.render("register");
};

module.exports.handleRegister = function (req, res, next) {
  const { email, password, cpassword, registerAs } = req.body;

  let errors = [];

  if (!email || !password || !cpassword || !registerAs)
    errors.push({ msg: "Please fill all the fields!!" });

  if (password !== cpassword) errors.push({ msg: "Password does not match" });

  if (password.length < 6)
    errors.push({ msg: "Password length should be atleast 6 characters" });

  if (errors.length) {
    res.render("register", {
      errors,
      email,
      password,
      cpassword,
      registerAs
    });
  } else {
    //Validation passed

    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User exist
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          email,
          password,
          cpassword,
          registerAs
        });
      } else {
        const newUser = new User({
          email,
          password,
          registerAs
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                console.log(`User`, user);
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

module.exports.login = function (req, res, next) {
  res.render("login");
};

module.exports.handleLogin = async (req, res, next) => {
  let successRedirect;
  let savedUser = await User.find({email : req.body.email})
  
  if (savedUser[0]?.registerAs ==='employer')
      successRedirect = "/employer/post_jobs"
  else  
      successRedirect = "/employee/view_details"
 
      
  passport.authenticate("local", {
    successRedirect,
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);


};

module.exports.logout = (req,res,next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
        req.flash('success_redirect', 'You are logout!!');
        res.redirect('/login');
  });
}