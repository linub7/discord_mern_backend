const User = require('../models/User');
const FriendInvitation = require('../models/FriendInvitation');
const {
  updateFriendsPendingInvitations,
} = require('../socketHandlers/update/friends');

exports.postInvite = async (req, res) => {
  try {
    const {
      body: { targetMailAddress },
      user: { email, userId },
    } = req;

    // if friend that we would like to invite is not user
    if (email.toLowerCase() === targetMailAddress.toLowerCase())
      return res
        .status(409)
        .json({ message: 'Sorry you cannot become friend with yourself' });

    const targetUser = await User.findOne({
      email: targetMailAddress.toLowerCase(),
    });

    if (!targetUser)
      return res.status(404).json({
        message: `Friend of ${targetMailAddress} has not been found. Please check email address.`,
      });

    // check if invitation has been already sent
    const invitationAlreadyReceived = await FriendInvitation.findOne({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived)
      return res.status(409).json({
        message: 'Invitation has been already sent.',
      });

    // check if the user which we would like to invite is already is our friend
    const usersAlreadyFriends = targetUser.friends.find(
      (friendId) => friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends)
      return res.status(409).json({
        message: 'Friend Already added, please check friend list.',
      });

    // create new Invitation ind DB
    const newInvitation = await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    // if invitation has been successfully created, we would like to update friends invitations if other user is online

    // send pendingInvitationsUpdate to specific user
    updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
