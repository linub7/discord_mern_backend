const jwt = require('jsonwebtoken');
const Joi = require('joi');

const config = process.env;

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

exports.loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

exports.verifyToken = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];

  if (!token)
    return res
      .status(403)
      .json({ message: 'Token is required for authentication' });
  try {
    token = token.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
