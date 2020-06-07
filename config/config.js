require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    database: '',
    dialect: 'mysql',
    operatorsAliases: false, // 연산자에 대한 별칭을 사용할 것인지? 뭔 말인지..
  },
  // test: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  //   operatorsAliases: false,
  // },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    database: '',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
