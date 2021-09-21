const express = require("express");
const router = express.Router()


const { getAgenda, addEvent , deleteEvent } = require("../controllers/agenda")




router.post("/addEvent", addEvent);
router.get('/getAgenda', getAgenda);
router.delete("/deleteEvent", deleteEvent);




module.exports = router