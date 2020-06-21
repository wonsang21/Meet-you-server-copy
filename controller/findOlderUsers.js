const { users, hobby, idealType, personality } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { filterHPIData } = require('./filterHPIData');
const { findRandomUsers } = require('./findRandom-users');

module.exports = {
  findOlderUsers: (userGender, age, address) => {
    return new Promise((resolve, reject) => {
      const findGender = userGender === '남자' ? '여자' : '남자';

      users
        .findAll({
          where: {
            gender: findGender,
            address: address,
            age: {
              [Op.gt]: age,
            },
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
          limit: 4,
        })
        .then(async (users) => {
          console.log(users);
          if (users.length === 0) {
            const randomUsers = await findRandomUsers(userGender);
            return resolve({
              '랜덤 유저': randomUsers,
            });
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
