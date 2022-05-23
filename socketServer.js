const authSocket = require('./middleware/authSocket');
const { setSocketServerInstance } = require('./serverStore');
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

  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);
    newConnectionHandler(socket, io);

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });
};

module.exports = { registerSocketServer };
