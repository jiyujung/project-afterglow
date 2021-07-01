const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

function selectCategory(category) {
    switch (category) {
        case "fragrance":
            return '1';
        case "bath-and-body":
            return '2';
        case "home-fragrance":
            return '3';
    }
}

function selectSorter(sorter) {
    switch (sorter) {
        case "latest-asc":
            return 'p_id desc'
        case "price-desc":
            return 'p_price desc'
        case "price-asc":
            return 'p_price asc'
    }
}

router.get('/:category', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    const category = req.params.category;
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM product WHERE p_category = " + selectCategory(category) + " and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY " + selectSorter(sorter);
        console.log(sql);

        connection.query(sql, ['%' + q + '%', '%' + q + '%', '%' + q + '%'], function (err, rows) {
            if (err) console.error("error: " + err);
            res.render(category, { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true });
            connection.release();
        });
    });
});

module.exports = router;