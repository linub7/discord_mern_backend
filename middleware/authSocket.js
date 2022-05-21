const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log(decoded);
    socket.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }
};

module.exports = verifyTokenSocket;
