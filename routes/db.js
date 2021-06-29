const mysql = require('mysql');
const pool = mysql.createPool(
  {
    connectionLimit: 10,
    host: "localhost",
    user: "afterglow",
    password: "AOVImSs9WIoCF4yL",
    port: 3306,
    database: "afterglow"
  });

module.exports = pool;
