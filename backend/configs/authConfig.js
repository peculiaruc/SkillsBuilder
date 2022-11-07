module.exports = {
  google: {
    clientID: process.env['GOOLE_CLIENT_ID'],
    clientSecret: process.env['GOOLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope:['profile']
  },
};
