const { users, hobby, personality, idealType } = require('../models');
const { filterHPIData } = require('./filterHPIData');

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
          if (users.length === 0) {
            return resolve('해당 유저가 없습니다.');
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
