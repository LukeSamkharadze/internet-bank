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

// storing all the online users here.
// interface of logged in user: {userId: string, socketIds: Array<string>}
let activeUserIds = [];

io.on('connection', (socket) => {
  // managing storing users with userId and socket Ids.
  socket.on('user_connected', (userId) => {
    if (!activeUserIds.find((user) => user.userId === userId)) {
      activeUserIds.push({ userId, socketIds: [socket.id] });
    } else {
      activeUserIds
        .find((user) => user.userId === userId)
        .socketIds.push(socket.id);
    }
  });

  // managing transaction events.
  socket.on('transaction', ({ fromAccountUserId, toUserId }) => {
    const fromUser = activeUserIds.find(
      (user) => user.userId === fromAccountUserId
    );
    fromUser.socketIds.forEach((socketId) => {
      io.to(socketId).emit('transaction', null);
    });
    if (toUserId && toUserId !== fromAccountUserId) {
      const toUser = activeUserIds.find((user) => user.userId === toUserId);
      toUser.socketIds.forEach((socketId) => {
        io.to(socketId).emit('transaction', null);
      });
    }
  });

  // handling SPENDINGS only
  socket.on('expanses', ({ fromAccountUserId }) => {
    const fromUser = activeUserIds.find(
      (user) => user.userId === fromAccountUserId
    );
    fromUser.socketIds.forEach((socketId) => {
      io.to(socketId).emit('expanses', null);
    });
  });

  // handling profle's information.
  socket.on('profile', (userId) => {
    const user = activeUserIds.find((usr) => usr.userId === userId);
    user.socketIds.forEach((socketId) => {
      io.to(socketId).emit('profile', null);
    });
  });

  // handling new card.
  socket.on('new-card', ({ userId, newCard }) => {
    const user = activeUserIds.find((usr) => usr.userId === userId);
    user.socketIds.forEach((socketId) => {
      io.to(socketId).emit('new-card', newCard);
    });
  });

  // handling new invoice.
  socket.on('invoice', ({ userId }) => {
    const user = activeUserIds.find((usr) => usr.userId === userId);
    user.socketIds.forEach((socketId) => {
      io.to(socketId).emit('invoice', null);
    });
  });

  // handling when socket/user disconnects.
  socket.on('disconnect', () => {
    for (let user of activeUserIds) {
      if (user.socketIds.includes(socket.id)) {
        user.socketIds = user.socketIds.filter(
          (socketId) => socketId !== socket.id
        );
        if (!user.socketIds.length) {
          activeUserIds = activeUserIds.filter(
            (usr) => usr.userId !== user.userId
          );
        }
        return;
      }
    }
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});