const express = require("express");
const passport = require('passport');
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/sign-in", userController.findUserByEmail);
userRoute.post("/sign-up", userController.createUser);

// Google OAuth
userRoute.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRoute.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to your dashboard or home page
  }
);

userRoute.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = userRoute;