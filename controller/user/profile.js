const { users } = require('../../models');
const { inspectUser_Data, updateHPIUserData } = require('../updateHPIUserData');

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

    const hobbies = req.body.hobby;
    const personalities = req.body.personality;
    const idealTypes = req.body.idealType;

    if (
      !inspectUser_Data(
        String(id),
        String(age),
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
        hobbies,
        personalities,
        idealTypes
      )
    ) {
      res.status(404).send('유저의 정보를 다시 확인해주세요.');
      return;
    }

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
      .then(async () => {
        await updateHPIUserData(id, hobbies, personalities, idealTypes);
        res.status(200).send('유저의 정보가 업데이트되었습니다.');
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
