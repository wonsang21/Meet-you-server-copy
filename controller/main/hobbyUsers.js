const { users } = require('../../models');

module.exports = {
  get: (req, res) => {
    req, res;
    const { userId } = req.query;

    users
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(async (user) => {
        const gender = user.dataValues.gender;
        gender;
      });
  },
};
