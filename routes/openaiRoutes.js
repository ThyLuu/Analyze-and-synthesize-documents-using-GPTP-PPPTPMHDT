const express = require('express')
const { summaryController, paragraphController } = require("../controllers/openaiController");

const router = express.Router()

//routes
router.post('/summary', summaryController)
router.post('/paragraph', paragraphController)

//addtion router 
// router.post('/chatbot', chatbotController)
// router.post('/js-converter', jsconverterController)
// router.post('/scifi-image', scifiImageController)

module.exports = router