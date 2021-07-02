const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const pool = require('./db.js');
const url = require('url');

// 카테고리 판별 함수(db에는 카테고리가 fragrance는 1, bath-and-body는 2, home-fragrance는 3으로 들어있기 때문)
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

// 정렬 판별 함수(최신순은 p_id를 역으로 정렬, 낮은 가격순은 p_price를 낮은 가격부터 정렬, 높은 가격순은 p_price를 높은 가격부터 정렬)
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

// 상품 리스트
router.get('/:category', function (req, res, next) {
    const q = req.query.q;
    const page = req.query.page;
    const sorter = req.query.sorter;
    const category = req.params.category;
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM product WHERE p_category = " + selectCategory(category) + " and (p_brand like ? or p_name like ? or p_note like ?) ORDER BY " + selectSorter(sorter);
        console.log(sql);
        connection.query(sql, ['%' + q + '%', '%' + q + '%', q], function (err, rows) {
            if (err) console.error("error: " + err);
            res.render(category, { user: req.user, q: q, rows: rows, page: page, length: rows.length - 1, page_num: 12, pass: true, sorter: sorter});
            connection.release();
        });
    });
});

module.exports = router;