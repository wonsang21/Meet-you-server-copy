const { users, hobby, idealType, personality } = require('../models');
const { filterHPIData } = require('./filterHPIData');
module.exports = {
  findRandomUsers: (gender) => {
    return new Promise((resolve, reject) => {
      const findGender = gender === '남자' ? '여자' : '남자';

      users
        .findAll({
          where: {
            gender: findGender,
          },
          attributes: ['id'],
        })
        .then((data) => {
          const userRandomIds = [];
          const userIds = data.map((user) => {
            return user.dataValues.id;
          });

          for (let i = 0; i < 2; i++) {
            let randomId = userIds[Math.floor(Math.random() * userIds.length)];
            userRandomIds.push(randomId);
            userIds.splice(userIds.indexOf(randomId), 1);
          }

          users
            .findAll({
              where: {
                id: userRandomIds,
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
            .then(async (users) => {
              if (users.length === 0) {
                return reject('가입한 남자 유저 또는 여자 유저가 없습니다.');
              }
              const filterUsersHPI = users.map(async (user) => {
                let data = await filterHPIData(JSON.stringify(user));
                return data;
              });
              resolve(Promise.all(filterUsersHPI));
            });
        });
    });
  },
};
