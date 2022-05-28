const { addNewConnectedUser } = require('../serverStore');
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require('./update/friends');
const { updateRooms } = require('./update/rooms');

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });

  // update pending friends invitations list
  updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);

  // update rooms => we fist want to update friends list and then rooms
  setInterval(() => {
    updateRooms(socket.id);
  }, 4000);
};

module.exports = newConnectionHandler;
