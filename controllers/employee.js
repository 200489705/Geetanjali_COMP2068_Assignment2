const Users = require("../models/schemas/User");
const Job = require("../models/schemas/Job");
const JobApplied = require("../models/schemas/Applied");
const User = require("../models/schemas/User");


module.exports.employee_details = function (req, res, next) {
  const { email } = req.user;

  Users.find({ email: email })
    .then((user) => {
      const { _id, email, full_name, highest_degree, phone_number, dob } = user[0];

      res.render("employee_details", {
        id: _id,
        email,
        full_name,
        highest_degree,
        phone_number,
        dob,
        tab_detail: "tab_detail",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.employee_edit_details = function (req, res, next) {
  const { id } = req.params;

  User.findByIdAndUpdate({_id : id}, req.body)
  .then(() => {
        User.findOne({_id : id})
        .then((user) => {
              res.render("employee_details", {
                  id : user._id,
                  full_name : user.full_name,
                  email : user.email,
                  dob : user.dob,
                  phone_number : user.phone_number,
                  highest_degree : user.highest_degree,
                  tab_detail: "tab_detail"
              })
        })
  })
  .catch(err => console.log(`Error`, err))

};

module.exports.employee_view_apply_jobs = function (req, res, next) {
  Job.find({})
    .then((job) => {
      res.render("employee_view_apply_jobs", {
        job,
        tab_view_apply_jobs: "tab_view_apply_jobs",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.employee_applied_jobs_get = function (req, res, next) {
  JobApplied.find({ email: req.user.email }).then((jobs) => {
    res.render("employee_applied_jobs", {
      job: jobs,
      tab_applied_jobs: "tab_applied_jobs",
    });
  });
};

module.exports.employee_applied_jobs_post = function (req, res, next) {
  const id = req.params.id;

  Job.findById(id)
    .then((result) => res.status(201).json({ result }))
    .catch((err) => console.log(err));
};

module.exports.employee_set_job = function (req, res, next) {
  const id = req.params.id;
  let success_msg;

  Job.findById(id)
    .then((answer) => {
      JobApplied.find({ job_title: answer.title, email: req.user.email }).then(
        (result) => {

          if (!result || !result.length) {
            const jobApplied = new JobApplied({
              job_title: answer.title,
              email: req.user.email,
              job_info: {
                title: answer.title,
                company_name: answer.company_name,
                location: answer.location,
              },
            });

            jobApplied
              .save()
              .then((output) => {
                    success_msg = "Applied successfully!!";
                    console.log(`Output`, output)
                    res.send({success_msg})
              })
              .catch((err) => console.log(`Inside Error`, err));
          }
          else {
              let error_msg = "Already Applied !!";
              res.send({error_msg})
          }
        }
      );
    })
    .catch((err) => console.log(`Outside Error`, err));
};
