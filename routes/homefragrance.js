var express = require('express');
var router = express.Router();
var pool = require('./db.js');
var url = require('url');

router.get('/', function(req, res, next) {
    res.redirect('/homefragrance/list/1');
});

router.get('/list/:page', function(req, res, next) {
  var page = req.params.page;
    pool.getConnection(function(err, connection) {
        var sqlForSelectList = "SELECT p_id, p_name, p_price, p_brand, p_img FROM product WHERE p_category=3";
        connection.query(sqlForSelectList, function(err, rows) {
            if(err) console.error("err: " + err);
            console.log("rows:" + JSON.stringify(rows));

            res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
            console.log(rows.length-1);
            connection.release();
        })
    })
})

router.get('/list/search/:page',function(req,res,next) {
  var page = req.params.page;
  var _url = req.url;
  var queryData = url.parse(_url,true).query;
  var search = '%' + queryData.homefragrance + '%';
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_category=3 and (p_brand like ? or p_name like ? or p_note like ?)";
    connection.query(sql, [search, search, search], function(err,rows) {
      if(err) console.error(err);
      
      console.log("rows:" + search);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/search/product/:p_id',function(req,res,next) {
  var p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/recent/:page',function(req,res,next) {
  var page = req.params.page;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_id desc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/recent/product/:p_id',function(req,res,next) {
  var p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/high/:page',function(req,res,next) {
  var page = req.params.page;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_price desc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/high/product/:p_id',function(req,res,next) {
  var p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/low/:page',function(req,res,next) {
  var page = req.params.page;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_price asc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/low/product/:p_id',function(req,res,next) {
  var p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/product/:p_id',function(req,res,next) {
  var p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

module.exports = router;