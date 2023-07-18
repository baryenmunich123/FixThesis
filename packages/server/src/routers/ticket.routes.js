const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller.js");

router.get("/getTicketInfo", ticketController.getTicketInfo);
router.get("/getDataByTicketID/:id", ticketController.getDataByTicketID);
router.post("/updateStepTicket", ticketController.updateStepTicket);
router.post("/updateStatus", ticketController.updateStatus);
router.post("/updatePreviousNote", ticketController.updatePreviousNote);
router.post("/updateTicketData", ticketController.updateTicketData);
router.post("/disapproveTicket", ticketController.disapproveTicket);
module.exports = router;
