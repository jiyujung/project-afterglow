const express = require('express');
const app = express();
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

router.get('/', function(req, res, next) {
    res.redirect('/homefragrance/list/1');
});

router.get('/list/:page', function(req, res, next) {
  const page = req.params.page;
    pool.getConnection(function(err, connection) {
        const sqlForSelectList = "SELECT p_id, p_name, p_price, p_brand, p_img FROM product WHERE p_category=3";
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
  const page = req.params.page;
  const _url = req.url;
  const queryData = url.parse(_url,true).query;
  const search = '%' + queryData.homefragrance + '%';
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_category=3 and (p_brand like ? or p_name like ? or p_note like ?)";
    connection.query(sql, [search, search, search], function(err,rows) {
      if(err) console.error(err);
      
      console.log("rows:" + search);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/search/product/:p_id',function(req,res,next) {
  const p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/recent/:page',function(req,res,next) {
  const page = req.params.page;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_id desc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/recent/product/:p_id',function(req,res,next) {
  const p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/high/:page',function(req,res,next) {
  const page = req.params.page;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_price desc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/high/product/:p_id',function(req,res,next) {
  const p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/low/:page',function(req,res,next) {
  const page = req.params.page;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_category=3 ORDER BY p_price asc";
    connection.query(sql, function(err,rows) {
      if(err) console.error(err);

      res.render('homefragrance', {rows:rows, page:page, length:rows.length-1, page_num:12, pass:true});
      connection.release();
      
    });
  })
});

router.get('/list/low/product/:p_id',function(req,res,next) {
  const p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

router.get('/list/product/:p_id',function(req,res,next) {
  const p_id = req.params.p_id;
  pool.getConnection(function(err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function(err,row) {
      if(err) console.error(err);
      if(row[0] !== undefined){
        req.session.uid = row[0].p_id;
        req.session.save(
          function(err){
            console.log(err);
          }
        );
      }
      res.render('product', {row:row[0]});
      connection.release();
    });
  })
});

module.exports = router;