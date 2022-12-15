import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      text,
    });

    console.log('email sent sucessfully');
    return true;
  } catch (error) {
    console.log(error, 'email not sent');
    return error;
  }
};

module.exports = sendEmail;
