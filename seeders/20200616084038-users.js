'use strict';
const { Fake_User } = require('../fake_folder/fakeUser');

module.exports = {
  up: (queryInterface) => {
    let key = [
      'username',
      'password',
      'age',
      'address',
      'profile_Photo',
      'nickname',
      'blood',
      'gender',
      'drinking',
      'smoking',
      'job',
      'school',
    ];
    const InsertDB_Fake_Data = Fake_User.map((PrivacyData) => {
      let obj = {};
      PrivacyData.forEach((data, j) => {
        obj[key[j]] = data;
      });
      return obj;
    });
    return queryInterface.bulkInsert('users', InsertDB_Fake_Data);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
