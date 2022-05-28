const { getActiveRoom, joinActiveRoom } = require('../serverStore');
const { updateRooms } = require('./update/rooms');

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantsDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = getActiveRoom(roomId);

  // send information to users in room that they should prepare for incoming connections
  roomDetails.participants.forEach((participant) => {
    // we dont want to send the information to ourself
    if (participant.socketId !== participantsDetails.socketId) {
      socket.to(participant.socketId).emit('conn-prepare', {
        connUserSocketId: participantsDetails.socketId,
      });
    }
  });

  joinActiveRoom(roomId, participantsDetails);

  updateRooms();
};

module.exports = roomJoinHandler;
