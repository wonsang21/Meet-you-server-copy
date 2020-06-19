const { users, hobby, idealType, personality } = require('../models');
const { filterHPIData } = require('./filterHPIData');

module.exports = {
  findUsersHPI: (gender, address, key, list_Data) => {
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
        })
        .then(async (users) => {
          if (users.length === 0) {
            return reject(`회원님의 지역에서는 찾을 수가 없습니다.`);
          }
          const filterUsersHPI = users.map(async (user) => {
            let data = await filterHPIData(JSON.stringify(user));
            return data;
          });
          let PromiseChangeData = await Promise.all(filterUsersHPI);

          const findUsers = PromiseChangeData.filter((user) => {
            let includeElemnt = list_Data.some((element) => {
              return user[key].includes(element);
            });

            return includeElemnt ? user : false;
          });
          resolve(findUsers);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
