
import passport from 'passport';

import GoogleStrategy from 'passport-google-oauth20';

import configs from '../../configs/authConfig';

const authController = require('../authController');

passport.use(new GoogleStrategy({...configs.google}),authController.googleLogin)

module.exports = passport