const authSocket = require('./middleware/authSocket');
const { setSocketServerInstance, getOnlineUsers } = require('./serverStore');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');

const registerSocketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();

    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 8000);
};

module.exports = { registerSocketServer };
