const mysql = require('mysql');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_DATABASE } = require("./index");

let connection;

const initMysql = () => {
  connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE
  });

  connection.connect();

  return connection;
}

const closeMysql = (connection) => {
  connection.end();
}

const getConnection = () => {
  return connection;
}

module.exports = {
  initMysql,
  closeMysql,
  getConnection,
}
