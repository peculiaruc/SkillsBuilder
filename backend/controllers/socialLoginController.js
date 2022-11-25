import { google, linkedin } from '../services/socialAuthService';
import Database from '../db/db';
import Helpers from '../helpers/helpers';

const db = new Database();
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
        const { email, name } = data;
        /**
         * Verify if the user exists in database
         */
        let user = await db.queryBuilder('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

        if (!user.rowCount) {
          /**
           * If not register the user
           */
          user = await db.queryBuilder(
            'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [name, email, '', '', 'google']
          );
        }
        /**
         * Create a token for the current user
         */
        const token = Helpers.generateToken(user.rows[0].id);

        res.status(200).send({
          status: 'success',
          data: {
            token,
            user: user.rows[0],
          },
        });
      }
      res.status(400).send({
        status: 'error',
        message: 'Invalid params',
      });
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
        const { data } = await linkedin.getUserInfo(access_token);
        const { emailAddress, localizedFirstName, localizedLastName } = data;
        /**
         * Verify if the user exists in database
         */
        let user = await db.queryBuilder('SELECT * FROM users WHERE email = $1 LIMIT 1', [
          emailAddress,
        ]);

        if (!user.rowCount) {
          /**
           * If not register the user
           */
          user = await db.query(
            'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [`${localizedFirstName} ${localizedLastName}`, emailAddress, '', '', 'linkedin']
          );
        }
        /**
         * Create a token for the current user
         */
        const token = Helpers.generateToken(user.rows[0].id);

        res.status(200).send({
          status: 'success',
          data: {
            token,
            user: user.rows[0],
          },
        });
      }
      res.status(400).send({
        status: 'error',
        message: 'Invalid params',
      });
    } catch (err) {
      // console.log(err);
      res.status(400).send({
        status: err.message,
      });
    }
  },
};
