const { addNewActiveRoom } = require('../serverStore');
const { updateRooms } = require('./update/rooms');

const roomCreateHandler = (socket) => {
  console.log('handling room create event');
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = addNewActiveRoom(userId, socketId);

  socket.emit('room-create', {
    roomDetails,
  });

  updateRooms();
};

module.exports = roomCreateHandler;
