module.exports = {
  googleLogin: (issuer, profile, done) => {
    console.log(issuer, profile);
    return done(null, null);
  },
};
