const { users, hobby, personality, idealType } = require('../models');

module.exports = {
  inspectUser_Data: (...body) => {
    let inscpect_result = body.every((data) => {
      return data && data.length;
    });
    return inscpect_result;
  },

  updateHPIUserData: (userId, hobbies, personalities, idealTypes) => {
    return new Promise((resolve, reject) => {
      const list = ['hobbylist', 'personalitylist', 'idealTypelist'];
      const models = [hobby, personality, idealType];
      const HPIs = [hobbies, personalities, idealTypes];
      const concat = HPIs.reduce((acc, cur) => {
        return acc.concat(cur);
      });

      const inscpect_HPIs = concat.every((data) => {
        return data && data.length;
      });

      if (!inscpect_HPIs) {
        return reject('취미, 성격, 이상형 데이터를 다시 확인해주세요.');
      }

      users
        .findOne({
          where: {
            id: userId,
          },
        })
        .then((user) => {
          list.forEach((listItem, index) => {
            models[index]
              .findAll({
                where: {
                  [list[index]]: HPIs[index],
                },
              })
              .then((values) => {
                listItem === 'hobbylist' ? user.setHobby(values) : null;
                listItem === 'personalitylist'
                  ? user.setPersonality(values)
                  : null;
                listItem === 'idealTypelist' ? user.setIdealType(values) : null;
              });
          });
        });
      resolve();
    });
  },
};
