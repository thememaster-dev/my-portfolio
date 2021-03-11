const express = require('express');
const passport = require('passport');

const router = express.Router();

// Controllers
const { register, login, me } = require('../controllers/auth');

// Auth Routes
router.post('/register', register);

router.post('/login', login);

router.get('/me', passport.authenticate('jwt', { session: false }), me);

module.exports = router;
