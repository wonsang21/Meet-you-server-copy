const { users, hobby, idealType, personality } = require('../models');
const { filterHPIData } = require('./filterHPIData');
const Sequelize = require('sequelize');

module.exports = {
  findRandomUsers: (gender) => {
    return new Promise((resolve, reject) => {
      const findGender = gender === '남자' ? '여자' : '남자';

      users
        .findAll({
          where: {
            gender: findGender,
          },
          include: [
            {
              model: hobby,
              as: 'hobby',
              attributes: ['hobbylist'],
              through: { attributes: [] },
            },

            {
              model: personality,
              as: 'personality',
              attributes: ['personalitylist'],
              through: { attributes: [] },
            },
            {
              model: idealType,
              as: 'idealType',
              attributes: ['idealTypelist'],
              through: { attributes: [] },
            },
          ],

          limit: 2,
          order: Sequelize.literal('rand()'),
        })
        .then((users) => {
          if (users.length === 0) {
            return resolve([]);
          }
          const filterUsersHPI = users.map(async (user) => {
            let data = await filterHPIData(JSON.stringify(user));
            return data;
          });
          resolve(Promise.all(filterUsersHPI));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
