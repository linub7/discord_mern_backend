const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { updateChatHistory } = require('./update/chat');

const directMessageHandler = async (socket, data) => {
  try {
    console.log('direct message event is being handled');
    const { userId } = socket.user;

    const { receiverUserId, content } = data;

    // create a new message
    const message = await Message.create({
      content,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    });

    // find if conversation exists with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, receiverUserId], // ordering in [] does not matter
      },
    });
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
