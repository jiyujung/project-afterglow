const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

router.get('/fragrance', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    let base = ''
    switch (sorter) {
        case "latest-asc":
            base = 'p_id desc'
            break;
        case "price-desc":
            base = 'p_price desc'
            break;
        case "price-asc":
            base = 'p_price asc'
            break;
    }
    console.log(base);
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM product WHERE p_category = 1 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY " + base;
        console.log(sql);

        connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
            if (err) console.error("error: " + err);
            res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true});
            connection.release();
        });
    });

});

router.get('/bath-and-body', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    let base = ''
    switch (sorter) {
        case "latest-asc":
            base = 'p_id desc'
            break;
        case "price-desc":
            base = 'p_price desc'
            break;
        case "price-asc":
            base = 'p_price asc'
            break;
    }
    console.log(base);
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM product WHERE p_category = 2 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY " + base;
        console.log(sql);

        connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
            if (err) console.error("error: " + err);
            res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
            connection.release();
        });
    });
});

router.get('/home-fragrance', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    let base = ''
    switch (sorter) {
        case "latest-asc":
            base = 'p_id desc'
            break;
        case "price-desc":
            base = 'p_price desc'
            break;
        case "price-asc":
            base = 'p_price asc'
            break;
    }
    console.log(base);
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM product WHERE p_category = 3 and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY " + base;
        console.log(sql);

        connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
            if (err) console.error("error: " + err);
            res.render('fragrance', { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
            connection.release();
        });
    });
});

module.exports = router;