const { users, hobby, idealType, personality } = require('../../models');
const crypto = require('crypto');
module.exports = {
  post: (req, res) => {
    let { username, password } = req.body;
    var shasum = crypto.createHash('sha1');
    let salt = 'random string';
    shasum.update(password + salt);
    password = shasum.digest('hex');

    users
      .findOne({
        where: {
          username: username,
          password: password,
        },
      })
      .then((user) => {
        if (user.length === 0) {
          res.status(404).send('아이디와 비밀번호가 일치하지 않습니다!');
        } else {
          let Id = user.dataValues.id;
          console.log(Id);
          users
            .findOne({
              where: {
                id: Id,
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
            .then((allUserData) => {
              res.status(200).send(allUserData);
            });
        }
      });
  },
};
