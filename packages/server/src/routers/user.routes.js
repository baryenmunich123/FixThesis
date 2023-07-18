const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/checkAccountInfo", UserController.checkAccountInfo);
router.get("/getStudentEmail", UserController.getStudentEmail);
router.get("/getStaffEmailList", UserController.getStaffEmailList);

module.exports = router;
