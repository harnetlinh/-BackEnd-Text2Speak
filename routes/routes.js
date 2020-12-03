const router = require('express').Router();
const Controller = require("../controllers/TTScontroller.js");
router.post("/text2speech",Controller.getAudio)
router.post("/feedback",Controller.getAudio)
module.exports = router;