const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

router.get('/:p_id', function (req, res, next) {
  const p_id = req.params.p_id;
  pool.getConnection(function (err, connection) {
    const sql = "SELECT * FROM product WHERE p_id=?";
    connection.query(sql, [p_id], function (err, row) {
      if (err) console.error(err);
      res.render('product', { row: row[0] });
      connection.release();
    });
  })
});

module.exports = router;