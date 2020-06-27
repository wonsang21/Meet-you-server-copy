const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const socket = function (socket) {
  console.log('채팅시작');

  socket.on('send message', (name, text) => {
    let msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });

  socket.on('disconnect', () => {
    console.log('채팅종료');
  });
};

module.exports = socket;
