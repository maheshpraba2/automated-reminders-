// backend/routes/reminderRoutes.js
const express = require('express');
const { createReminder } = require('../controllers/reminderController');
const router = express.Router();

router.post('/', createReminder);

module.exports = router;
