const express = require('express');

const router = express.Router();

// Controllers
const { register } = require('../controllers/auth');

// Auth Routes
router.post('/register', register);

module.exports = router;
