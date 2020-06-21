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

        const olderUsers = await findOlderUsers(
          userGender,
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
