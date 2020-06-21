const { users, hobby, idealType, personality } = require('../models');
const { filterHPIData } = require('./filterHPIData');
const { findRandomUsers } = require('./findRandom-users');

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
          console.log(users);
          if (users.length === 0) {
            const randomUsers = await findRandomUsers(gender);
            return resolve({ '랜덤 유저': randomUsers });
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
          if (findUsers.length === 0) {
            const randomUsers = await findRandomUsers(gender);
            return resolve({ '랜덤 유저': randomUsers });
          }

          resolve(findUsers);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
