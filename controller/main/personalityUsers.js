const { users, personality } = require('../../models');
const { findUsersHPI } = require('../findUsersHPI');

module.exports = {
  get: (req, res) => {
    req, res;
    const { userId } = req.query;

    users
      .findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: personality,
            as: 'personality',
            attributes: ['personalitylist'],
            through: { attributes: [] },
          },
        ],
      })
      .then(async (user) => {
        const users_Data = JSON.parse(JSON.stringify(user));
        const { gender, address, personality } = users_Data;
        const key = Object.keys(users_Data).pop();
        const list = Object.keys(users_Data[key][0])[0];
        const list_Data = personality.map((obj) => {
          return obj[list];
        });

        const personalityUsers = await findUsersHPI(
          gender,
          address,
          key,
          list_Data
        );
        res.status(200).send(personalityUsers);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
