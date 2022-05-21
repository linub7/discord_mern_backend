const { removeConnectedUser } = require('../serverStore');
const disconnectHandler = (socket) => {
  removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
