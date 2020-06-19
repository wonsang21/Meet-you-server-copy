const { users, idealType } = require('../../models');
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
            model: idealType,
            attributes: ['idealTypelist'],
            through: { attributes: [] },
          },
        ],
      })
      .then(async (user) => {
        const users_Data = JSON.parse(JSON.stringify(user));
        const { gender, address, idealTypes } = users_Data;
        const key = Object.keys(users_Data).pop();
        const list = Object.keys(users_Data[key][0])[0];
        const list_Data = idealTypes.map((obj) => {
          return obj[list];
        });

        const hobbyUsers = await findUsersHPI(gender, address, key, list_Data);
        res.status(200).send(hobbyUsers);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
