const { addNewConnectedUser } = require('../serverStore');

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });
};

module.exports = newConnectionHandler;
