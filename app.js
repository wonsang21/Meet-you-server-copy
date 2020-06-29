require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models/index");
const app = express();
const userRouter = require("./routes/user");
const mainRouter = require("./routes/main");
const miniRouter = require("./routes/mini");
const pointRouter = require("./routes/point");
const { chattings } = require("./models");
const http = require("http");
const server = http.createServer(app);

const io = require('socket.io')(server);
const { rooms } = require('./rooms');
const { Op } = require('sequelize');
app.get('/', (req, res) => {
  res.send('Hello Express');

});
app.use(bodyParser.json());
const port = 5000;
server.listen(port, () => {
  console.log(`server listen on 5000`);
});
models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공!");
  })
  .catch((err) => {
    console.log("DB 연결 실패ㅠㅠ");
    console.log(err);
  });
app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/mini", miniRouter);
app.use("/minosPoint", pointRouter);
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST"],
    credentials: true,
  })
);
// socket io client 통신부분
// socket 통신 연결 성공시
io.on("connection", async (socket) => {
  let roomNames = await rooms();
  console.log("모든 룸들 가져왔슝 =>", roomNames);
  console.log("socket 연결 성공!", socket.id); // 성공
  socket.emit("welcome", "welcome Meet-you chatting socket area!"); // 성공
  console.log("채팅룸배열: ", roomNames);
  socket.on("joinRoom", (roomInfo) => {
    // roomInfo는 룸정보가 들어있는 객체
    console.log("roomInfo: ", roomInfo);
    console.log("room요청이름: ", roomInfo.myUsername + roomInfo.username);
    // 특정 룸 접속 요청에 대한 처리
    let count = 0;

    for (let room of roomNames) {
      if (
        room.includes(roomInfo.myUsername) &&
        room.includes(roomInfo.username)
      ) {
        socket.join(room);
        console.log("success", "해당룸이 존재하며 접속에 성공하였습니다.");
        console.log("현재 소켓이 접속되어 있는 룸번호: ", room);
        // DB에서 가져온 해당룸의 채팅기록을 client로 보내준다.
        ////////////////////////////////////////////
        ////DB에서 룸에 저장된 메시지를 불러오는 코드작성/////
        ////////////////////////////////////////////
        let roomname = room;
        chattings
          .findAll({
            where: {
              roomName: roomname,
            },
            attributes: ["message"],
            raw: true,
          })
          .then((data) => {
            if (data[0].message !== null) {
              let data_parse = JSON.parse(data[0].message);

              console.log("DB에서 룸에 저장된 메시지를 불러옴 => ", data_parse);
              socket.emit("messages", data_parse); // DB에서 불러온 채팅방 메시지를 클라이언트로 보내준다.

            }
          });
        break;
      } else {
        count++;

        console.log("카운트 값: ", count);

        // 특정 룸이 없다면 새로 룸만 생성한다.
        if (count === roomNames.length) {
          console.log("fail", "해당룸은 존재 하지 않아서 새로 생성하겠습니다.");
          socket.join(roomInfo.myUsername + roomInfo.username);
          const createRoomName = roomInfo.myUsername + roomInfo.username;

          chattings.create({
            userName: roomInfo.myUsername,
            roomName: createRoomName,
          });

          console.log(
            "현재 소켓이 접속되어 있는 룸번호: ",
            roomInfo.myUsername + roomInfo.username
          );
          count = 0;
          break;
        }
      }
    }

    socket.on('message', (newMessage) => {
      const myUsername = roomInfo.myUsername;
      const pairname = roomInfo.username;
      const roomName1 = myUsername + pairname;
      const roomName2 = pairname + myUsername;

      chattings
        .findAll({
          where: {
            [Op.or]: [{ roomName: roomName1 }, { roomName: roomName2 }],
          },
          attributes: ["message", "roomName"],
          raw: true,
        })
        .then((data) => {
          console.log("DB: ", data);

          if (data[0].message !== null) {
            console.log("DB 0번째", data[0]);
            let message = data[0].message;
            let message_parse = JSON.parse(message);
            message_parse.unshift(newMessage);
            let json = JSON.stringify(message_parse);
            chattings.update(
              {
                message: json,
              },
              {
                where: {
                  roomName: data[0].roomName,
                },
              }
            );
          } else {
            let array = [];
            array.push(newMessage);
            let json = JSON.stringify(array);
            chattings.update(
              {
                message: json,
              },
              {
                where: {
                  roomName: data[0].roomName,
                },
              }
            );
          }

          socket.broadcast.to(data[0].roomName).emit("message", newMessage); // {...}
          console.log("상대방에게 보내는 메시지", newMessage);
        });
    });
  });
  // 클라이언트에서 보내온 채팅메시지를 같은룸의 상대방에게 보낸다.
});
// roomInfo.myUsername = '공유',
// message = {...}
// const myUsername = '공유';
// const username = '김지원';
// const roomName = myUsername + username;
// const user_message = {
//   공유왈: '김지원 예쁘다',
// };

app.post('/roomName', (req, res) => {
  const { username } = req.body;
  chattings
    .findAll({
      where: {
        userName: username,
      },
      attributes: ["roomName", "message"],
      raw: true,
    })
    .then((roomNames) => {
      console.log(roomNames);

      if (roomNames.length === 0) {
        return res.status(404).send("유저의 룸이 없습니다.");
      }
      return res.status(200).send(roomNames);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});
