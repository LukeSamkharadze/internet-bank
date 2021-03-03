const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200'],
  },
});
app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  socket.on('transaction', () => {
    console.log('yeah transaction happened');
    io.emit('transaction');
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});
