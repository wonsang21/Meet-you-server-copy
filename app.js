require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/index');
const app = express();
const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');

const server = require('http').Server(app);
const io = require('socket.io')(server);

// const io = require('socket.io').listen(80);

const socket = require('./controller/chating/socket');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', socket);
console.log('++++++', socket);

// io.on('connection', (socket) => {
//   console.log('++++++', socket);
//   console.log('접속하셨습니다.');
//   socket.on('send message', (name, text) => {
//     let msg = name + ' : ' + text;
//     console.log(msg);
//     socket.emit('receive message', msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('떠나셨습니다.');
//   });
// });

setInterval(() => {
  io.emit('ping', { data: new Date() / 1 });
}, 1000);

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: ['http://localhost:19002'],
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
