const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('main.ejs', { user: req.user });
});

router.get('/recommend', function (req, res) {
  res.render('recommend.ejs', { user: req.user });
});

router.get('/mypage', function (req, res) {
  res.render('mypage.ejs', { user: req.user });
});

router.get('/review', function (req, res) {
  res.render('review.ejs', { user: req.user });
});

module.exports = router;