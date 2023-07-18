const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.createNewDynamicForm = async (req, res) => {
  try {
    let formData = req.body;
    let connection = await dbConnection();
    let sql = `INSERT INTO dynamic_form (form_name,form_file,form_data,date_created,form_title) VALUES (?, ?, ?, ?,?)`;
    const values = [
      formData.formName,
      formData.formFile,
      formData.formData,
      formData.formattedDate,
      formData.formTitle,
    ];
    await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Created New Form",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Error occurred while creating a new form",
    });
  }
};

exports.postDynamicFormData = async (req, res) => {
  try {
    const {
      formattedDate: currentDate,
      formId,
      stringifyData,
      userID,
    } = req.body;
    let connection = await dbConnection();
    let findProfileIdQuery =
      "select profile_id, username from profile join account on account.account_id = profile.account_id WHERE username = ? ";
    let username = [userID];
    let findProfile = await sqlQuery(connection, findProfileIdQuery, username);
    const profileId = findProfile[0].profile_id;
    let sql = `INSERT INTO request_ticket (date_created, form_id, ticket_data,profile_id,active_step) VALUES (?,?,?,?,1)`;
    let values = [
      currentDate.slice(0, 19).replace("T", " "),
      formId,
      stringifyData,
      profileId,
    ];

    await sqlQuery(connection, sql, values);

    connection.end();
    res.status(200).json({
      message: "Successfully submit",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormList = async (_req, res) => {
  try {
    const connection = await dbConnection();
    const sql = "SELECT * FROM dynamic_form";
    const getFormList = await sqlQuery(connection, sql);

    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormByID = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `
    select form_name,form_file,form_data from dynamic_form join request_ticket on dynamic_form.form_id = request_ticket.form_id where ticket_id = ${req.params.ticketID}`;
    let getFormList = await sqlQuery(connection, sql);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormInputsByID = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `
    select form_name,form_data,ticket_data,active_step from dynamic_form join request_ticket on dynamic_form.form_id = request_ticket.form_id where ticket_id = ${req.params.ticketID}`;
    let getFormList = await sqlQuery(connection, sql);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
exports.updateDynamicForm = async (req, res) => {
  try {
    let formData = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE dynamic_form
    SET form_name = ?, form_file = ?, form_data = ?, date_created = ?, form_title = ?
    WHERE form_id = ?;
    `;
    const values = [
      formData.formUpdateName,
      formData.formUpdateFile,
      formData.formUpdateData,
      formData.formattedDate,
      formData.formTitle,
      formData.formId,
    ];
    await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Modified Form",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Error occurred while creating a new form",
    });
  }
};
exports.deleteDynamicFormById = async (req, res) => {
  try {
    let formData = req.body;
    let connection = await dbConnection();
    let sql = `DELETE FROM dynamic_form WHERE form_id = ?`;
    let values = [formData.formId];
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.createNewFormLink = async (req, res) => {
  try {
    let formLinkData = req.body;
    let connection = await dbConnection();
    let sql = `INSERT INTO form_link (form_link_name, form_link_url, form_link_description,date_created) VALUES (?,?,?,?)`;
    let values = [
      formLinkData.formLinkName,
      formLinkData.formLinkUrl,
      formLinkData.formLinkDescription,
      formLinkData.formattedDate,
    ];
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully submit",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getFormLinkList = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = "SELECT * FROM form_link";
    let getFormList = await sqlQuery(connection, sql);

    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateFormLink = async (req, res) => {
  try {
    let formLinkData = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE form_link
    SET form_link_name = ?, form_link_url = ?, form_link_description = ?,date_created = ?
    WHERE form_link_id = ?;
    `;
    const values = [
      formLinkData.formLinkName,
      formLinkData.formLinkURL,
      formLinkData.formLinkDescription,
      formLinkData.formattedDate,
      formLinkData.formLinkId,
    ];
    await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Modified Form",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Error occurred while creating a new form",
    });
  }
};
exports.deleteFormLinkById = async (req, res) => {
  try {
    let formData = req.body;
    let connection = await dbConnection();
    let sql = `DELETE FROM form_link WHERE form_link_id = ?`;
    let values = [formData.formId];
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
