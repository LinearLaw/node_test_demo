const express = require("express");
const router = express.Router();

import * as userCtrl from "../controller/userController.js";

router.post("/dologin",userCtrl.doLogin);
router.post("/doregist",userCtrl.doRegist);

module.exports = router;
