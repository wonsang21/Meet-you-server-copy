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
        const findGender = userGender === 'man' ? 'women' : 'man';
        const olderUsers = await findOlderUsers(
          findGender,
          userAge,
          userAddress
        );
        res.status(200).send(olderUsers);
      });
  },
};
