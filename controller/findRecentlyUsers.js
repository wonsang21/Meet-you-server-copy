const { users, hobby, personality, idealType } = require('../models');
const { filterHPIData } = require('./filterHPIData');
const { findRandomUsers } = require('./findRandom-users');

module.exports = {
  findRecenetlyUsers: (gender, address) => {
    return new Promise((resolve, reject) => {
      const findGender = gender === '남자' ? '여자' : '남자';

      users
        .findAll({
          where: {
            gender: findGender,
            address: address,
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
          order: [['id', 'DESC']],
          limit: 4,
        })
        .then(async (users) => {
          console.log(JSON.parse(JSON.stringify(users)));
          if (users.length === 0) {
            const randoemUsers = await findRandomUsers(gender);
            return resolve(randoemUsers);
          }
          const filterUsersHPI = users.map(async (user) => {
            let data = await filterHPIData(JSON.stringify(user));
            return data;
          });
          console.log(await Promise.all(filterUsersHPI));
          resolve(Promise.all(filterUsersHPI));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
