const router = require("express").Router();
const { sendMessage } = require("../controllers/admin.controller");

router.post("/postman", sendMessage);

module.exports = router;
