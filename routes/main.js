const express  = require('express');
const router   = express.Router();

router.get('/', function(req,res){
  res.render('main', {user: req.user});
});

router.get('/recommend', function(req,res){
  res.render('recommend.ejs', {user: req.user});
});

router.get('/mypage', function(req,res){
  res.render('mypage.ejs', {user: req.user});
});

module.exports = router;