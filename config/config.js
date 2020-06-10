require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    database: 'meetyouDB',
    dialect: 'mysql',
    operatorsAliases: false, // 연산자에 대한 별칭을 사용할 것인지? 뭔 말인지..
  },
  production: {
    username: 'lostJK',
    password: process.env.RDS_PASSWORD,
    host: '',
    database: 'Meet-you',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
