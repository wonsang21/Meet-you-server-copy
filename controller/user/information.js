const { users, hobby, idealType, personality } = require('../../models');
const { findRandomUsers } = require('../findRandom-users');
const { filterHPIData } = require('../filterHPIData');
module.exports = {
  get: (req, res) => {
    const username = req.username;
    const password = req.password;

    users
      .findOne({
        where: {
          username: username,
          password: password,
        },
        include: [
          {
            model: hobby,
            attributes: ['hobbylist'],
            through: { attributes: [] },
          },
          {
            model: personality,
            attributes: ['personalitylist'],
            through: { attributes: [] },
          },
          {
            model: idealType,
            attributes: ['idealTypelist'],
            through: { attributes: [] },
          },
        ],
      })
      .then(async (user) => {
        const gender = user.dataValues.gender;
        const randomUsers = await findRandomUsers(gender);
        const filterUserHPI = await filterHPIData(JSON.stringify(user));
        res.status(200).send([filterUserHPI, randomUsers]);
      });
  },
};
