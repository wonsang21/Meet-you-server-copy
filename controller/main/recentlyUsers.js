const { users } = require('../../models');
const { findRecenetlyUsers } = require('../findRecentlyUsers');
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
        const gender = user.dataValues.gender;
        const address = user.dataValues.address;
        const recentlyUsers = await findRecenetlyUsers(gender, address);
        res.status(200).send(recentlyUsers);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
