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

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.use('/user', userRouter);
app.use('/main', mainRouter);
app.use('/mini', miniRouter);
app.use('/minosPoint', pointRouter);

// socket io client 통신부분
const chattingRooms = ['공유김지원', '공유문채원', '김지원박서준']; // db roomname 컬럼을 가져와서 배열로 만든다.
// socket 통신 연결 성공시
io.on('connection', (socket) => {
  console.log('socket 연결 성공!', socket.id); // 성공
  socket.emit('welcome', 'welcome Meet-you chatting socket area!'); // 성공
  console.log('채팅룸배열: ', chattingRooms);
  socket.on('joinRoom', (roomInfo) => {
    // roomInfo는 룸정보가 들어있는 객체
    console.log('roomInfo: ', roomInfo);
    console.log('room요청이름: ', roomInfo.myUsername + roomInfo.username);
    // 특정 룸 접속 요청에 대한 처리
    let count = 0;
    for (let room of chattingRooms) {
      if (
        room.includes(roomInfo.myUsername) &&
        room.includes(roomInfo.username)
      ) {
        socket.join(room);
        console.log('success', '해당룸이 존재하며 접속에 성공하였습니다.');
        console.log('현재 소켓이 접속되어 있는 룸번호: ', room);
        // DB에서 가져온 해당룸의 채팅기록을 client로 보내준다.
        ////////////////////////////////////////////
        ////DB에서 룸에 저장된 메시지를 불러오는 코드작성/////
        ////////////////////////////////////////////
        break;
      } else {
        count++;
        // 특정 룸이 없다면 새로 룸만 생성한다.
        if (count === chattingRooms.length) {
          console.log('fail', '해당룸은 존재 하지 않아서 새로 생성하겠습니다.');
          socket.join(roomInfo.myUsername + roomInfo.username);
          chattingRooms.push(roomInfo.myUsername + roomInfo.username); // db연결되면 push할 필요없이 db로 바로 저장
          console.log(
            '현재 소켓이 접속되어 있는 룸번호: ',
            roomInfo.myUsername + roomInfo.username
          );
          break;
        }
      }
    }
  });
  // 클라이언트에서 보내온 채팅메시지를 같은룸의 상대방에게 보낸다.
  socket.on('message', (message) => {
    socket.broadcast.to('room1').emit('message', message);
    console.log('상대방에게 보내는 메시지', message);
  });
});

app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    method: ['GET', 'POST'],
    credentials: true,
  })
);

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
