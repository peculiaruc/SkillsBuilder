import express from "express"
import passport from "passport"
import configs from "../configs/authConfig"

const router  = express.Router()

router.get('/auth/google', passport.authenticate('google'));

router.get(
  configs.google.callbackURL,
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

export default router