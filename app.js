const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models/index');
const app = express();
const userRouter = require('./routes/user');

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

const reqBody = {
  // userId : 1
  password: 'dogn1234!#',
  age: 27,
  address: '울산',
  username: '김동구리1232222',
  profile_Photo: 'agch4det3@442$%%@',
  nickname: '메로짱',
  blood: 'B',
  gender: 'man',
  drinking: '전혀 안함',
  smoking: '전혀 안함',
  job: '집사',
  school: '고등학교 졸업',
  hobby: ['운동', '책읽기'],
  personality: ['도도한', '친절한', '4차원'],
  idealType: ['외모', '몸매', '성격'],
};

models.users
  .findOrCreate({
    where: {
      username: reqBody.username,
    },
    defaults: {
      password: reqBody.password,
      age: reqBody.age,
      address: reqBody.address,
      username: reqBody.username,
      profile_Photo: reqBody.profile_Photo,
      nickname: reqBody.nickname,
      blood: reqBody.blood,
      gender: reqBody.gender,
      drinking: reqBody.drinking,
      smoking: reqBody.smoking,
      job: reqBody.job,
      school: reqBody.school,
    },
  })
  .then(async ([user, created]) => {
    if (!created) {
      console.log('아이디 있음!');
      return;
    } else {
      const { hobby, personality, idealType } = reqBody; // hobby = [asdasdsd, asdas]
      const models_Data = [models.hobby, models.personality, models.idealType];
      const list_Data = ['hobbylist', 'personalitylist', 'idealTypelist'];
      const user_Data = [hobby, personality, idealType];

      for (let i = 0; i < models_Data.length; i++) {
        models_Data[i] // models.hobby
          .findAll({
            where: {
              [list_Data[i]]: user_Data[i],
              // 'hobbylist': ['운동', '책읽기']
            },
          })

          .then((values) => {
            /* values = [{id:1, hobbylist: '운동'},{id:2, hobbylist: '여행'}] */
            const set_Data = [
              list_Data[i] === 'hobbylist' ? user.setHobbies(values) : null,

              list_Data[i] === 'personalitylist'
                ? user.setPersonalities(values)
                : null,
              list_Data[i] === 'idealTypelist'
                ? user.setIdealTypes(values)
                : null,
            ];

            set_Data[i];
          });
      }
    }
  });

/* id가 1인 유저의 모든 데이터를 데이터베이스에서 가져올려면? */
const reqLoginBody = 1;
models.users
  .findOne({
    where: {
      id: reqLoginBody,
    },
    include: [
      {
        model: models.hobby,
        attributes: ['hobbylist'],
      },
    ],
  }) // [{id: 3, username: asd}, {id: 5, username: zmsmnsns}]
  .then((data) => {
    console.log('DATABASE GET DATA: ', JSON.stringify(data));
  });

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

// inclued => 조인할
