const mysql = require('mysql');

const initMysql = () => {
  const connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7579828',
    password: 'lLNXklvsII',
    port: '3306',
    database: 'sql7579828'
  });

  connection.connect();

  return connection;
}

const closeMysql = (connection) => {
  return connection.end();
}

module.exports.initMysql = initMysql;
module.exports.closeMysql = closeMysql;
