const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email }).then(user => {
    // check if email exist
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Email exists'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastnaem,
            username: req.body.username,
            phone: req.body.phone,
            usertype: req.body.usertype
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'User created'
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
        }
      });
    }
  });
};

exports.user_signin = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(user => {
      // no user
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      // return a user -> compare passwords
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth Successful',
            token: token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete_user = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
