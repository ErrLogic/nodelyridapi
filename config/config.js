const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alpine",
  database: "lyrid",
});

const promisePool = pool.promise();

module.exports = promisePool;
