const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");
const Admin = require("../db/Admin");

const router = express.Router();

router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      let userDetails;
      
      if (user.type === "recruiter") {
        userDetails = new Recruiter({
          userId: user._id,
          name: data.name,
          contactNumber: data.contactNumber,
          bio: data.bio,
        });
      } else if (user.type === "applicant") {
        userDetails = new JobApplicant({
          userId: user._id,
          name: data.name,
          education: data.education,
          skills: data.skills,
          cgpa: data.cgpa !== undefined ? parseFloat(data.cgpa) : 0,
          rating: data.rating,
          resume: data.resume,
          profile: data.profile,
        });
      } else if (user.type === "admin") {
        userDetails = new Admin({
          userId: user._id,
          name: data.name,
          contactNumber: data.contactNumber,
          role: data.role || "System Administrator",
          permissions: data.permissions || ["view_all_jobs", "view_all_users", "view_all_applications", "manage_users"],
        });
      }

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router;
