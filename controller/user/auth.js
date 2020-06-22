const twilioUtils = require('../twilioUtils');

let tempAuthObj = {};

module.exports = {
  postauth: async (req, res) => {
    let { userphone, verifynum } = req.body;
    try {
      tempAuthObj = await twilioUtils.auth(userphone);
      if (tempAuthObj instanceof Error) {
        res.status(500).json({ error: tempAuthObj.message });
      } else {
        res.sendStatus(200);
      }
    } catch (err) {
      console.error('error', err);
      res.status(500).json({ error: err });
    }
  },
  postverify: async (req, res) => {
    let { userphone, verifynum } = req.body;
    if (verifynum !== undefined && userphone !== undefined) {
      if (tempAuthObj[userphone] === Number(verifynum)) {
        delete tempAuthObj[userphone];
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      if (userphone === undefined || userphone === '') {
        res.status(400).json('변경할 휴대폰 번호를 입력해주세요');
      } else if (verifynum === undefined) {
        res.status(400).json('인증번호를 입력해주세요');
      } else {
        res.status(400).json('변경할 휴대폰 번호를 입력해주세요');
      }
    }
  },
};
