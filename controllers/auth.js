const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {
      body: { username, password, email },
    } = req;

    // check if user exist
    const existUser = await User.exists({ email });
    if (existUser)
      return res.status(409).json({ message: 'Email already in use' }); // 409: conflict statusCode

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document and save in db
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      userDetails: {
        email: newUser.email,
        token,
        username: newUser.username,
        _id: newUser._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      body: { password, email },
    } = req;

    // check if user does'nt exist
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(400)
        .json({ message: 'Wrong Credential, please try again' });

    // decode password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res
        .status(400)
        .json({ message: 'Wrong Credential, please try again' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.status(200).json({
      userDetails: {
        email: user.email,
        token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
