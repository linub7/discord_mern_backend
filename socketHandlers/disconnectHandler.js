const { removeConnectedUser, getActiveRooms } = require('../serverStore');
const roomLeaveHandler = require('./roomLeaveHandler');
const disconnectHandler = (socket) => {
  const activeRooms = getActiveRooms();

  activeRooms.forEach((room) => {
    const isUserInRoom = room.participants.some(
      (participant) => participant.socketId === socket.id
    );

    if (isUserInRoom) {
      roomLeaveHandler(socket, { roomId: room.roomId });
    }
  });
  removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
