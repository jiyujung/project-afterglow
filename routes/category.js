const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

router.get('/fragrance', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    switch (sorter) {
        case "latest-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 1 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_id desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-desc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 1 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 1 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price asc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
    }

});

router.get('/bath-and-body', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    switch (sorter) {
        case "latest-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 2 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_id desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('bathandbody', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-desc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 2 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('bathandbody', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 2 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price asc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('bathandbody', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
    }
});

router.get('/home-fragrance', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    switch (sorter) {
        case "latest-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 3 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_id desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('homefragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-desc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 3 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price desc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('homefragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
        case "price-asc":
            pool.getConnection(function (err, connection) {
                const sql = "SELECT * FROM product WHERE p_category = 3 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY p_price asc";
                connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
                    if (err) console.error("error: " + err);
                    res.render('homefragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
                    connection.release();
                });
            });
            break;
    }
});

module.exports = router;