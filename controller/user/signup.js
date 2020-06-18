const { users, hobby, personality, idealType } = require('../../models');

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
        },
      })
      .then(async ([users, created]) => {
        console.log('test');
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

              list_Data[i] === 'hobbylist' ? users.setHobbies(values) : null;

              list_Data[i] === 'personalitylist'
                ? users.setPersonalities(values)
                : null;
              list_Data[i] === 'idealTypelist'
                ? users.setIdealTypes(values)
                : null;
            });
        }
        res.status(201).json(data);
      });
  },
};
