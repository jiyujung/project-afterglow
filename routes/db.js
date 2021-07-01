const mysql = require('mysql');
const pool = mysql.createPool(
  {
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "mysql",
    port: 3306,
    database: "afterglow"
  });

module.exports = pool;
