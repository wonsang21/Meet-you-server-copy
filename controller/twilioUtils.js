const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
const tempAuthObj = {};
module.exports = {
  auth: async (userphone) => {
    const authNumber = Math.floor(Math.random() * 10000);
    try {
      if (!userphone) throw new Error('잘못된 휴대폰 번호입니다.');
      tempAuthObj[userphone] = authNumber;
      userphone = `+82${userphone.slice(1)}`;
      await client.messages.create({
        body: `Meet-you 회원가입 인증번호 ${authNumber}`,
        to: userphone,
        from: process.env.TWILIO_FROM,
      });
    } catch (err) {
      return err;
    }
    return tempAuthObj;
  },
};
