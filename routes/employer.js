let express = require('express');
let {ensureAuthenticated} = require('../config/auth');
let router = express.Router();


let employer = require("../controllers/employer");


// router.get("/dashboard", ensureAuthenticated, employer.dashboard);

router.get("/post_jobs",ensureAuthenticated, employer.view_post_jobs);

router.post("/post_jobs",ensureAuthenticated, employer.add_post_jobs)

router.get("/view_jobs",ensureAuthenticated, employer.view_jobs);

router.delete("/delete_jobs/:job_title",ensureAuthenticated, employer.delete_jobs);

module.exports = router;