require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/index');
const app = express();
const userRouter = require('./routes/user');

// const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.use('/user', userRouter);

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

// const reqBody = {
//   // userId : 1
//   password: 'dogn1234ㅋㅋㅋㅋㅋ!#',
//   age: 27,
//   address: '서울',
//   username: '손꾸11락',
//   profile_Photo: 'agch4det3@442$%%@',
//   nickname: '슈퍼손',
//   blood: 'O',
//   gender: 'man',
//   drinking: '가끔',
//   smoking: '전혀 안함',
//   job: '축구선수',
//   school: '고등학교 졸업',
//   hobby: ['운동', '여행', '산책'],
//   personality: ['활발한', '친절한', '도도한'],
//   idealType: ['외모', '몸매', '성격', '돈', '직업'],
// };

// models.users
//   .findOrCreate({
//     where: {
//       username: reqBody.username,
//     },
//     defaults: {
//       password: reqBody.password,
//       age: reqBody.age,
//       address: reqBody.address,
//       profile_Photo: reqBody.profile_Photo,
//       nickname: reqBody.nickname,
//       blood: reqBody.blood,
//       gender: reqBody.gender,
//       drinking: reqBody.drinking,
//       smoking: reqBody.smoking,
//       job: reqBody.job,
//       school: reqBody.school,
//     },
//   })
//   .then(async ([user, created]) => {
//     if (!created) {
//       console.log('아이디 있음!');
//       return;
//     } else {
//       const { hobby, personality, idealType } = reqBody; // hobby = [asdasdsd, asdas]
//       const models_Data = [models.hobby, models.personality, models.idealType];
//       const list_Data = ['hobbylist', 'personalitylist', 'idealTypelist'];
//       const user_Data = [hobby, personality, idealType];

//       for (let i = 0; i < models_Data.length; i++) {
//         console.log(models_Data[i]);
//         models_Data[i] // models.hobby
//           .findAll({
//             where: {
//               [list_Data[i]]: user_Data[i],
//               // 'hobbylist': ['운동', '책읽기']
//             },
//           })

//           .then((values) => {
//             console.log(values);
//             /* values = [{id:1, hobbylist: '운동'},{id:2, hobbylist: '여행'}] */
//             const set_Data = [
//               list_Data[i] === 'hobbylist' ? user.setHobbies(values) : null,

//               list_Data[i] === 'personalitylist'
//                 ? user.setPersonalities(values)
//                 : null,
//               list_Data[i] === 'idealTypelist'
//                 ? user.setIdealTypes(values)
//                 : null,
//             ];

//             set_Data[i];
//           });
//       }
//     }
//   });

//   models.hobby
//     .findAll({
//       where: {
//         hobbylist: hobby, /* hobby = ['운동', '여행'] */
//       },
//     })
//     .then((hobby_User_Data) => { /* hobby_User_Data = [{id:1, hobbylist: '운동'},{id:4, hobbylist: '여행'}] */
//       user.setHobbies(hobby_User_Data)
//     });
// }

// const posts = [
//   {
//     username: '손흥민',
//     title: 'Post 1',
//   },
//   {
//     username: '해리케인',
//     title: 'Post 2',
//   },
// ];

// /* POST /user/login */
// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const user = { name: username };
//   // 토큰 발행
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: '24h',
//   });
//   console.log(accessToken);
//   // 클라이언트한테 토큰을 보내줌
//   res.status(200).send({ accessToken: accessToken });
// });

// /* GET user/information */
// app.get('/information', authenticateToken, (req, res) => {
//   // 클라이언트한테 유저의 개인정보 보내줌
//   res.status(200).send(posts.filter((post) => post.username === req.user.name));
// });

// /* 토큰 검사 */
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     console.log(token);
//     console.log(user);
//     req.user = user;
//     next();
//   });
// }
