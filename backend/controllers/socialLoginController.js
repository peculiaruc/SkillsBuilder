import Helpers from '../helpers/helpers';
import Token from '../models/token';
import User from '../models/users';
import { google, linkedin } from '../services/socialAuthService';

const model = new User();
const tokn = new Token();

module.exports = {
  googleLogin: async (req, res) => {
    try {
      const { code, redirect_uri } = req.body;
      /**
       * Request google access token
       */
      const { data } = await google.getAccessToken(code, redirect_uri);
      const { access_token } = data;
      /**
       * Verify the access token by query user info
       */
      if (access_token) {
        const { data } = await google.getUserInfo(access_token);
        const { email, name, picture } = data;
        /**
         * Verify if the user exists in database
         */
        let user = await model.getByEmail(email);
        // let user = await db.queryBuilder('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

        if (!user.count) {
          /**
           * If not register the user
           */
          user = await model.create({
            email,
            fullname: name,
            auth_method: 'google',
            role: 0,
            picture,
          });
          // eslint-disable-next-line prefer-destructuring
          user = { row: user.rows[0] };
        }
        /**
         * Create a token for the current user
         */
        const token = Helpers.generateToken(user.row.id);
        await tokn.create({
          user_id: user.row.id,
          token,
          type: 'verify',
        });

        res.status(200).send({
          status: 'success',
          data: {
            token,
            user: user.row,
          },
        });
      } else{
        res.status(400).send({
          status: 'error',
          message: 'Invalid params',
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).send({
        status: err.message,
      });
    }
  },
  linkedInLogin: async (req, res) => {
    try {
      const { code, redirect_uri } = req.body;
      /**
       * Request linkedin access token
       */
      const { data } = await linkedin.getAccessToken(code, redirect_uri);
      const { access_token } = data;
      /**
       * Verify the access token by query user info
       */
      if (access_token) {
        const { data: response } = await linkedin.getUserInfo(access_token);
        const {
          emailAddress,
          localizedFirstName,
          localizedLastName,
          picture,
        } = response;
        /**
         * Verify if the user exists in database
         * */
        let user = await model.getByEmail(emailAddress);
        // let user = await db.queryBuilder('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

        if (!user.count) {
          /**
           * If not register the user
           */
          user = await model.create({
            email: emailAddress,
            picture,
            fullname: `${localizedFirstName} ${localizedLastName}`,
            auth_method: 'linkedin',
            role: 0,
          });
          // eslint-disable-next-line prefer-destructuring
          user = { row: user.rows[0] };
        }
        /**
         * Create a token for the current user
         */
        const token = Helpers.generateToken(user.row.id);
        await tokn.create({
          user_id: user.row.id,
          token,
          type: 'verify',
        });

        res.status(200).send({
          status: 'success',
          data: {
            token,
            user: user.row,
          },
        });
      } else{
        res.status(400).send({
          status: 'error',
          message: 'Invalid params',
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).send({
        status: err.message,
      });
    }
  },
};
