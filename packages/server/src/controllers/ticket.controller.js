const { dayjs } = require("../constants/date");
const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.getTicketInfo = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `SELECT ticket_id,form_name , request_ticket.date_created, date_approved, status, note, account.username, active_step
    FROM request_ticket JOIN dynamic_form ON dynamic_form.form_id = request_ticket.form_id JOIN profile on request_ticket.profile_id = profile.profile_id JOIN account ON profile.account_id = account.account_id
    ORDER BY request_ticket.ticket_id DESC`;
    const rs = await sqlQuery(connection, sql);
    const formattedTicketInfo = rs.map((el) => {
      return {
        ...el,
        date_created: dayjs(el?.date_created).format(),
      };
    });
    connection.end();
    res.send(formattedTicketInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDataByTicketID = async (req, res) => {
  try {
    let connection = await dbConnection();
    const paramId = req.params.id;
    let sql = `SELECT ticket_data ,note,username,status, active_step FROM request_ticket JOIN profile on request_ticket.profile_id = profile.profile_id JOIN account ON profile.account_id = account.account_id  WHERE ticket_id = ? `;
    const value = [paramId];
    let getDataByTicketID = await sqlQuery(connection, sql, value);
    connection.end();
    res.send(getDataByTicketID);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateStepTicket = async (req, res) => {
  try {
    let connection = await dbConnection();
    let ticketId = req.body.ticketID;
    let sql = `UPDATE request_ticket SET active_step = active_step + 1 WHERE ticket_id = ? `;
    const values = [ticketId];
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let connection = await dbConnection();
    let currentDate = req.body.currentDate;
    let ticketId = req.body.ticketID;
    let sql = `UPDATE request_ticket SET status = "Done", date_approved = ? WHERE ticket_id = ? `;
    const values = [currentDate, ticketId];
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update status successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updatePreviousNote = async (req, res) => {
  try {
    let connection = await dbConnection();
    const values = [req.body.note, req.body.ticketID];
    let sql = `UPDATE request_ticket SET note = ? WHERE ticket_id = ? `;
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update Note successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.disapproveTicket = async (req, res) => {
  try {
    let ticketData = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE request_ticket
    SET status = 'Update'
    WHERE ticket_id = ?`;
    let values = [ticketData.ticketID];
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

exports.updateTicketData = async (req, res) => {
  try {
    let newData = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE request_ticket
    SET ticket_data = ?,
     status = 'Waiting'
    WHERE ticket_id = ?`;
    let values = [newData.ticketData, newData.ticketID];
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
