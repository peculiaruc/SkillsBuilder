import { google, linkedin } from '../services/socialAuthService';

module.exports = {
  googleLogin: async (req, res) => {
    const { code, redirect_uri } = req.body;
    try {
      const { data } = await google.getAccessToken(code, redirect_uri);
      const { access_token, expires_in } = data;

      console.log(access_token, expires_in);

      if (access_token) {
        const { data } = await google.getUserInfo(access_token);
        const { email, name, picture } = data;
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: err?.data?.message,
      });
    }
  },
  linkedInLogin: async (req, res) => {
    const { code, redirect_uri } = req.body;
    try {
      const { data } = await linkedin.getAccessToken(code, redirect_uri);
      const { access_token, expires_in } = data;

      console.log(access_token, expires_in);

      if (access_token) {
        const userInfo = await linkedin.getUserInfo(access_token);
        console.log(userInfo);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: err?.data?.message,
      });
    }
  },
};
