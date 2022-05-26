const mongoose = require('mongoose');

const {
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: 'User',
    },
    content: { type: String },
    date: { type: Date },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
