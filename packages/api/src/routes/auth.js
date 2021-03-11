const express = require('express');

const router = express.Router();

// Controllers
const { register, login } = require('../controllers/auth');

// Auth Routes
router.post('/register', register);

router.post('/login', login);

router.get('/me', async () => {});

module.exports = router;
