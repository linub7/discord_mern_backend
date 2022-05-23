const User = require('../../models/User');
const FriendInvitation = require('../../models/FriendInvitation');
const {
  getActiveConnections,
  getSocketServerInstance,
} = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username email');

    // find all active connections of specific userId
    const receiverList = getActiveConnections(userId);

    const io = getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async (userId) => {
  try {
    // find active connections of specific id (online users)
    const receiverList = getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        'friends',
        '_id username email'
      );

      if (user) {
        const friendsList = user.friends.map((friend) => {
          return {
            id: friend._id,
            email: friend.email,
            username: friend.username,
          };
        });

        // get io server instance
        const io = getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log();
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
