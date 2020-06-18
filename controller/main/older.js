const { users } = require('../../models');
const { findOlderUsers } = require('../findOlderUsers');
module.exports = {
  get: (req, res) => {
    const { userId } = req.query;

    users
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(async (user) => {
        const userGender = user.dataValues.gender;
        const userAge = user.dataValues.age;
        const userAddress = user.dataValues.address;
        const findGender = userGender === '남자' ? '여자' : '남자';
        const olderUsers = await findOlderUsers(
          findGender,
          userAge,
          userAddress
        );
        res.status(200).send(olderUsers);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
