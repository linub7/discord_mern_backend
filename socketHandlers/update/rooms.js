const {
  getSocketServerInstance,
  getActiveRooms,
} = require('../../serverStore');

exports.updateRooms = (toSpecifiedTargetId = null) => {
  const io = getSocketServerInstance();
  const activeRooms = getActiveRooms();

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit('active-rooms', {
      activeRooms,
    });
  } else {
    io.emit('active-rooms', {
      activeRooms,
    });
  }
};
