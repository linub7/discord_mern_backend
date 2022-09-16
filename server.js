const { readdirSync } = require('fs');
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { registerSocketServer } = require('./socketServer');
require('dotenv').config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: 'https://animated-douhua-c84a19.netlify.app',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

readdirSync('./routes').map((r) =>
  app.use(`/api/v1/`, require('./routes/' + r))
);

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('> DB Connected'))
  .catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`);
});
