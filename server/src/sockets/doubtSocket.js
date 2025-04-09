const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("Socket connected");

    socket.on('join-room', ({ doubtId }) => {
      socket.join(doubtId);
    });

    socket.on('send-message', async ({ doubtId, sender, message }) => {
      const newMsg = await Message.create({ doubt: doubtId, sender, message });
      io.to(doubtId).emit('receive-message', newMsg);
    });

    socket.on('disconnect', () => {
      console.log("Socket disconnected");
    });
  });
};
