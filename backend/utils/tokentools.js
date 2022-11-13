import jwt from 'jsonwebtoken';
import crypto from 'crypto';

module.exports = {
  createUserToken: (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '24H',
    });
  },
  createRandomToken: () => crypto.randomBytes(32).toString('hex'),
};
