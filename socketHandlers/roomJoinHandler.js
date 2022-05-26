const { getActiveRoom, joinActiveRoom } = require('../serverStore');
const { updateRooms } = require('./update/rooms');

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantsDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = getActiveRoom(roomId);

  joinActiveRoom(roomId, participantsDetails);

  updateRooms();
};

module.exports = roomJoinHandler;
