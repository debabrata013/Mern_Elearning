const Message = require('../models/Message');


module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log("⚡ Socket connected");
  
      socket.on('join-room', ({ doubtId }) => {
        socket.join(doubtId);
      });
  
      socket.on('send-message', async ({ doubtId, sender, message }) => {
        const msg = await Message.create({ doubt: doubtId, sender, message });
        io.to(doubtId).emit('receive-message', msg);
      });
  
      socket.on('disconnect', () => {
        console.log("⚠️ Socket disconnected");
      });
    });
  };
