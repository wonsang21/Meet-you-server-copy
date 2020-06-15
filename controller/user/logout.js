module.exports = {
  post: (req, res) => {
    res.cookie('token', '').status(200).send('로그아웃 완료');
  },
};
