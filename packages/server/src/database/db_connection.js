const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config()

//-----------------------------------
const dbConfig = {
  host: process.env.APP_ENV_MYSQL_HOST,
  user: process.env.APP_ENV_MYSQL_USER,
  password: process.env.APP_ENV_MYSQL_PASSWORD,
  database: process.env.APP_ENV_MYSQL_DB,
  timezone: 'Asia/Saigon'
};

module.exports = () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((error) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(connection);
    });
  });



