const socket = function (socket) {
  console.log('connection chting start');

  socket.on('send message', (name, text) => {
    let msg = name + ' : ' + text;
    console.log(msg);
    socket.emit('receive message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

module.exports = socket;
