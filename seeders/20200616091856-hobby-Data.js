'use strict';
const { Fake_HobbyData } = require('../fake_folder/fake_hobbyData');

module.exports = {
  up: (queryInterface) => {
    const InsertDB_Fake_Data = [];

    for (let key in Fake_HobbyData) {
      Fake_HobbyData[key].forEach((number) => {
        let obj = {};
        obj.userId = Number(key);
        obj.hobbyId = number;
        InsertDB_Fake_Data.push(obj);
      });
    }
    return queryInterface.bulkInsert('hobby_Data', InsertDB_Fake_Data);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hobby_Data', null, {});
  },
};
