const { users, hobby, personality, idealType } = require('../../models');
const moment = require('moment');
moment.tz.setDefault('Asia/Seoul');
const dateAndTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log('한국 현재 시각', dateAndTime);
/* dataAndTime = "2020-06-19 14:41:02" */

module.exports = {
  post: (req, res) => {
    const {
      age,
      username,
      password,
      address,
      profile_Photo,
      nickname,
      blood,
      gender,
      drinking,
      smoking,
      job,
      school,
    } = req.body;

    users
      .findOrCreate({
        where: {
          username: username,
        },
        defaults: {
          password: password,
          age: age,
          address: address,
          profile_Photo: profile_Photo,
          nickname: nickname,
          blood: blood,
          gender: gender,
          drinking: drinking,
          smoking: smoking,
          job: job,
          school: school,
          signUpCreateTime: dateAndTime,
        },
      })
      .then(async ([users, created]) => {
        if (!created) {
          return res.status(409).send('Already exists user');
        }
        const data = await users.get({ plain: true });
        const models_Data = [hobby, personality, idealType];
        const list_Data = ['hobbylist', 'personalitylist', 'idealTypelist'];
        const user_Data = [
          req.body.hobby,
          req.body.personality,
          req.body.idealType,
        ];

        for (let i = 0; i < 3; i++) {
          models_Data[i] // models.hobby
            .findAll({
              where: {
                [list_Data[i]]: user_Data[i],
              },
            })

            .then((values) => {
              /* values = [{id:1, hobbylist: '운동'},{id:2, hobbylist: '여행'}] */

              list_Data[i] === 'hobbylist' ? users.setHobby(values) : null;

              list_Data[i] === 'personalitylist'
                ? users.setPersonality(values)
                : null;
              list_Data[i] === 'idealTypelist'
                ? users.setIdealType(values)
                : null;
            });
        }
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
