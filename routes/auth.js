const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');

router.get('/login', function (req, res) {
  res.render('auth/login');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google'), authSuccess
);

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook'), authSuccess
);

function authSuccess(req, res) {
  res.redirect('/');
}

module.exports = router;