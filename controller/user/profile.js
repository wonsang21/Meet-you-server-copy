const { users } = require('../../models');
const { inspectUser_Data, updateHPIUserData } = require('../updateHPIUserData');

module.exports = {
  post: (req, res) => {
    const {
      id,
      password,
      address,
      profile_Photo,
      nickname,
      blood,
      drinking,
      smoking,
      job,
      school,
      hobby,
      personality,
      idealType,
    } = req.body;

    if (
      !inspectUser_Data(
        String(id),
        password,
        address,
        profile_Photo,
        nickname,
        blood,
        drinking,
        smoking,
        job,
        school,
        hobby,
        personality,
        idealType
      )
    ) {
      res.status(404).send('유저의 정보를 다시 확인해주세요.');
      return;
    }

    users
      .update(
        {
          password: password,
          address: address,
          profile_Photo: profile_Photo,
          nickname: nickname,
          blood: blood,
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
        await updateHPIUserData(id, hobby, personality, idealType);
        res.status(200).send('유저의 정보가 업데이트되었습니다.');
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
