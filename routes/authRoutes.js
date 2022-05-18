const express = require('express');
const { register, login } = require('../controllers/auth');
const { registerSchema, loginSchema } = require('../middleware/authValidation');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();

router.post('/auth/register', validator.body(registerSchema), register);
router.post('/auth/login', validator.body(loginSchema), login);

module.exports = router;
