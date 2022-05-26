const mongoose = require('mongoose');

const {
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: ObjectId, ref: 'User' }],
    messages: [{ type: ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
