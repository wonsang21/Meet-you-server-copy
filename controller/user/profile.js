const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const {
      id,
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

    // const hobby_Data = req.body.hooby;
    // const personality_Data = req.body.personality;
    // const idealType_Data = req.body.idealType;

    users
      .update(
        {
          age: age,
          username: username,
          password: password,
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
        {
          where: {
            id: id,
          },
        }
      )
      .then((data) => {
        if (data[0] === 0)
          return res.status(404).send('회원의 정보가 바뀌지 않았습니다.');
        res.status(200).send('회원의 정보가 변경되었습니다.');
      });
  },
};
