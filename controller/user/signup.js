const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const {
      age,
      username,
      password,
      address,
      profile_photo,
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
          profile_photo: profile_photo,
          nickname: nickname,
          blood: blood,
          gender: gender,
          drinking: drinking,
          smoking: smoking,
          job: job,
          scholl: school,
        },
      })
      .then(async ([users, created]) => {
        console.log('test');
        if (!created) {
          return res.status(409).send('Already exists user');
        }
        const data = await users.get({ plain: true });

        res.status(201).json(data);
      });
  },
};
