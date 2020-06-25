module.exports = {
  filterHPIData: (user) => {
    return new Promise((resolve, reject) => {
      let user_Data = JSON.parse(user);
      let HPIs = ['hobby', 'personality', 'idealType'];
      let HPIlist = ['hobbylist', 'personalitylist', 'idealTypelist'];

      if (Object.keys(user).length === 0) {
        return reject('Not found user');
      }
      for (let i = 0; i < 3; i++) {
        const array_Data = user_Data[HPIs[i]];
        const array = array_Data.map((obj) => {
          return obj[HPIlist[i]];
        });
        user_Data[HPIs[i]] = array;
      }
      resolve(user_Data);
    });
  },
};
