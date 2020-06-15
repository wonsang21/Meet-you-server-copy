require('dotenv').config();

const { users } = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
          const { username, password } = user.dataValues;
          const setUser = { username: username, password: password };
          const accessToken = jwt.sign(
            setUser,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '24h',
            }
          );
          res.status(200).send({ accessToken: accessToken });
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
