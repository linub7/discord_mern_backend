const { addNewConnectedUser } = require('../serverStore');
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require('./update/friends');

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });

  // update pending friends invitations list
  updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;
