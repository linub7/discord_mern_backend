const mongoose = require('mongoose');

const {
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const friendInvitationSchema = new mongoose.Schema(
  {
    senderId: {
      type: ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FriendInvitation', friendInvitationSchema);
