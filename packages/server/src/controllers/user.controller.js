const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.checkAccountInfo = async (req, res) => {
  try {
    const { username, password } = req.body;
    let connection = await dbConnection();
    let getUserNameQuery = `SELECT username FROM account WHERE username = ? `;
    let getPasswordQuery = `SELECT password FROM account WHERE password = ? `;
    let getRoleQuery = `SELECT name FROM account join role on account.role_id = role.role_id WHERE username = '${username}' and password = '${password}'`;
    let getUserName = await sqlQuery(connection, getUserNameQuery, [username]);
    let getPassword = await sqlQuery(connection, getPasswordQuery, [password]);
    let getRole = await sqlQuery(connection, getRoleQuery);
    connection.end();
    if (getUserName.length === 0) {
      return res.json({
        message: "Invalid userName or password",
      });
    } else if (getPassword.length === 0) {
      return res.json({
        message: "Invalid userName or password",
      });
    } else {
      return res.status(200).json({
        message: "Login Successfully",
        role: getRole[0].name,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getStaffEmailList = async (req, res) => {
  try {
    let connection = await dbConnection();
    const { staffRole } = req.query;
    let sql =
      "select email from account join profile on account.account_id = profile.account_id JOIN role ON account.role_id = role.role_id where role.name = ? ";
    let values = [staffRole];
    let getFormList = await sqlQuery(connection, sql, values);

    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
exports.getStudentEmail = async (req, res) => {
  try {
    let connection = await dbConnection();
    const { requestor } = req.query; // Retrieve requestor value from query parameters
    let sql =
      "SELECT email FROM profile JOIN account ON account.account_id = profile.account_id WHERE username = ?";
    let values = [requestor];
    let getFormList = await sqlQuery(connection, sql, values);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
