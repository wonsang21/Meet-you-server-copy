const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    console.log(users, req, res);
  },
};
