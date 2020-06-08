require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'Meet-you',
    dialect: 'mysql',
    operatorsAliases: false, // 연산자에 대한 별칭을 사용할 것인지? 뭔 말인지..
  },
  // test: {
  //   username: 'root',
  //   password: process.env.DB_PASSWORD,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  //   operatorsAliases: false,
  // },
  production: {
    username: 'lostJK',
    password: process.env.RDS_PASSWORD,
    host: '',
    database: 'Meet-you',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
