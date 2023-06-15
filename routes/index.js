let express = require('express');
let router = express.Router();

let userAuthentication = require("../controllers/userAuthentication");
let index = require("../controllers/index");



/* GET login page */
router.get('/login', userAuthentication.login);


/* Post login */
router.post('/login', userAuthentication.handleLogin);

/* GET register page */
router.get('/register', userAuthentication.register);

/* Post register */
router.post('/register', userAuthentication.handleRegister);

/* Get Logout */
router.get('/logout', userAuthentication.logout);


router.get('/', index.home);

router.get("/about",index.about);

router.get("/contact",index.contact);

module.exports = router;
