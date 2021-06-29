const mysql = require('mysql');
const { connect } = require('./main');
const pool = mysql.createPool(
  {
    connectionLimit: 3,
    host: "localhost",
    user: "root",
    password: "mysql",
    port: 3306,
    database: "afterglow"
  });

module.exports = pool;
