const express = require('express');
const router = express.Router();
const habitController = require('./controller/habitController');

router.get('/habits',habitController.getAllHabit);
router.get('/habit/:id',habitController.getHabitDetails);
router.post('/habits',habitController.addHabit);
router.post('/habit/:id/update',habitController.updateHabitStatus);
module.exports = router;