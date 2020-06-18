const { users } = require('../../models');
const { findRandomUsers } = require('../findRandom-users');
module.exports = {
  get: (req, res) => {
    const { userId } = req.query;
    console.log(req.query);
    users
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(async (user) => {
        const gender = user.dataValues.gender;
        const randomUsers = await findRandomUsers(gender);
        res.status(200).send(randomUsers);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
