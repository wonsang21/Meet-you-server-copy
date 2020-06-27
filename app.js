require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/index');
const app = express();
const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const miniRouter = require('./routes/mini');
const pointRouter = require('./routes/point');

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/in.html');
});

// io.on('connection', (socket) => {
//   console.log('채팅시작');

//   // console.log('===== socet =====', socket);
//   socket.on('send message', (name, text) => {
//     let msg = name + ' : ' + text;
//     console.log(msg);
//     io.emit('receive message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('채팅종료');
//   });
// });

// const server = app.listen(3000, function () {
//   console.log('server On!');
// });

// const io = require('socket.io').listen(server, {
//   log: false,
//   origins: '*:*',
//   pingInterval: 3000,
//   pingTimeout: 5000,
// });

// //-------- room --------//
// const rooms = [];

io.on('connect', (socket) => {
  socket.emit('message', { socketId: socket.id });
  console.log('채팅시작');
  console.log('connection>>', socket.id, socket.handshake.query);

  //방연결
  socket.on('join', (roomName, fn) => {
    socket.join(roomName, () => {
      console.log('join', roomName, Object.keys(socket.rooms));
      if (fn) {
        fn();
      }
    });
    // let room = roomId.room;
    // //rooms에 해당 room이 없다면 room을 생성
    // if (rooms[room] === undefined) {
    //   rooms[room] = new Object();
    // }
  });
  //방 나가기
  socket.on('leave', (roomName) => {
    socket.leave(roomName);
  });
  //메세지 전송
  socket.on('message', (data, fn) => {
    console.log('msg', data.msg, Object.keys(socket.rooms));
    if (fn) {
      fn(data.msg);
    }
    socket.broadcast
      .to(data.room)
      .emit('message', { room: data.room, msg: data.msg });
    // io.to(room).emit('receive message', msg);
  });
  //채팅종료
  socket.on('disconnecting', () => {
    console.log('disconnecting', socket.id, Object.keys(socket.rooms));
  });
  socket.on('disconnect', () => {
    console.log('채팅종료');
  });
});

////////////////////
// var rooms = [];

// app.get('/:room', function (req, res) {
//   console.log('room name is :' + req.params.room);
//   res.render('index', { room: req.params.room });
// });

// io.sockets.on('connection', function (socket) {

//   socket.on('joinroom', function (data) {
//     socket.join(data.room);

//     socket.set('room', data.room, function () {
//       var room = data.room;

//       // Create Room
//       if (rooms[room] == undefined) {
//         console.log('room create :' + room);
//         rooms[room] = new Object();
//       }

//       // broad cast join message
//       data = { msg: socket.id + ' 님이 입장하셨습니다.' };
//       io.sockets.in(room).emit('broadcast_msg', data);

//       // broadcast changed user list in the room
//       io.sockets
//         .in(room)
//         .emit('userlist', { users: Object.keys(rooms[room].socket.id) });
//     });
//   });

//   socket.on('disconnect', function (data) {
//     socket.get('room', function (err, room) {
//       if (err) throw err;

//       if (room != undefined && rooms[room] != undefined) {
//         socket.get('nickname', function (err, nickname) {
//           console.log('nickname ' + nickname + ' has been disconnected');

//           // 여기에 방을 나갔다는 메세지를 broad cast 하기
//           if (nickname != undefined) {
//             if (rooms[room].socket_ids != undefined)
//               delete rooms[room].socket.id;
//           } // if

//           data = { msg: nickname + ' 님이 나가셨습니다.' };

//           io.sockets.in(room).emit('broadcast_msg', data);
//           io.sockets
//             .in(room)
//             .emit('userlist', { users: Object.keys(rooms[room].socket.id) });
//         });
//       }
//     });
//   });
// });

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    method: ['GET', 'POST'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.use('/user', userRouter);
app.use('/main', mainRouter);
app.use('/mini', miniRouter);
app.use('/minosPoint', pointRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`server listen on 5000`);
});

models.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공!');
  })
  .catch((err) => {
    console.log('DB 연결 실패ㅠㅠ');
    console.log(err);
  });

const { chattings } = require('./models');

app.post('/chatMsgAndRoomSave', (req, res) => {
  // req.body = [원상님이 보내주시는 객체들]
  const { userName, message, roomName } = req.body;
  const MessageConvertJson = JSON.stringify(message);

  chattings
    .findAll({
      where: {
        userName: userName,
        roomName: roomName,
      },
      raw: true,
    })
    .then((data) => {
      if (data.length === 0) {
        chattings.create({
          userName: userName,
          roomName: roomName,
          message: MessageConvertJson,
        });
        return res.status(200).send('유저의 채팅 목록을 저장하였습니다.');
      }
      let insertedMessage = data[0].message;
      let parsing_Message = JSON.parse(insertedMessage);
      message.forEach((obj) => {
        parsing_Message.push(obj);
      });
      let convertJson = JSON.stringify(parsing_Message);
      chattings.update(
        {
          message: convertJson,
        },
        {
          where: {
            userName: userName,
            roomName: roomName,
          },
        }
      );
      res.status(200).send('유저의 메세지를 추가하였습니다.');
    });
});

app.post('/chatInfo', (req, res) => {
  const { userName, roomName } = req.body;
  chattings
    .findOne({
      where: {
        userName: userName,
        roomName: roomName,
      },
      attributes: ['message'],
    })
    .then((data) => {
      const user_message = data.get({ plain: true });
      const { message } = user_message;
      const parsing_Message = JSON.parse(message);
      res.status(200).send(parsing_Message);
    });
});
