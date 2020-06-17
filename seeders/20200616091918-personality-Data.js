'use strict';
const { Fake_personalityData } = require('../fake_folder/fake_personalityData');

module.exports = {
  up: (queryInterface) => {
    const InsertDB_Fake_Data = [];

    for (let key in Fake_personalityData) {
      Fake_personalityData[key].forEach((number) => {
        let obj = {};
        obj.userId = Number(key);
        obj.personalityId = number;
        InsertDB_Fake_Data.push(obj);
      });
    }
    return queryInterface.bulkInsert('personality_Data', InsertDB_Fake_Data);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('personality_Data', null, {});
  },
};
