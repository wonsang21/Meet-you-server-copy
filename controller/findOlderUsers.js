const { users, hobby, idealType, personality } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { filterHPIData } = require('./filterHPIData');

module.exports = {
  findOlderUsers: (findGender, age, address) => {
    return new Promise((resolve, reject) => {
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
          if (users.length === 0) {
            return reject(
              '회원님의 지역에 회원님보다 나이가 많은 유저를 찾을 수 없습니다.'
            );
          }
          const filterUsersHPI = users.map(async (user) => {
            let data = await filterHPIData(JSON.stringify(user));
            return data;
          });
          resolve(Promise.all(filterUsersHPI));
        });
    });
  },
};
