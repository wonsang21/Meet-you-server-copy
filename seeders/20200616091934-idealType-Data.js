'use strict';
const { Fake_idealTypeData } = require('../fake_folder/fake_idealType');
//
module.exports = {
  up: (queryInterface) => {
    const InsertDB_Fake_Data = [];

    for (let key in Fake_idealTypeData) {
      Fake_idealTypeData[key].forEach((number) => {
        let obj = {};
        obj.userId = Number(key);
        obj.idealTypeId = number;
        InsertDB_Fake_Data.push(obj);
      });
    }
    return queryInterface.bulkInsert('idealType_Data', InsertDB_Fake_Data);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('idealType_Data', null, {});
  },
};
