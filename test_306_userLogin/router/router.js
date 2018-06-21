const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/userController.js");

router.post("/doLogin",userCtrl.doLogin);
router.post("/doRegist",userCtrl.doRegist);

module.exports = router;
