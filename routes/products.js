const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

// 상품 상세 정보
router.get('/:p_id', function (req, res, next) {
  const p_id = req.params.p_id;
  pool.getConnection(function (err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function (err, row) {
      if (err) console.error(err);
      res.render('product', {user: req.user, row: row[0] });
      connection.release();
    });
  })
});

// 상품 리뷰
router.get('/:p_id/reviews', function (req, res, next) {
    const p_id = req.params.p_id;
    pool.getConnection(function (err, connection) {
      const sql = "SELECT * FROM product WHERE p_id=?";
      connection.query(sql, [p_id], function (err, row) {
        if (err) console.error(err);
        res.render('review', {user: req.user, row: row[0] });
        connection.release();
      });
    })
});

// 상품 리뷰 생성 폼
router.get('/:p_id/reviews/form', function (req, res, next) {
    const p_id = req.params.p_id;
    pool.getConnection(function (err, connection) {
      const sql = "SELECT * FROM product WHERE p_id=?";
      connection.query(sql, [p_id], function (err, row) {
        if (err) console.error(err);
        res.render('review_form', { user: req.user });
        connection.release();
      });
    })
});

module.exports = router;