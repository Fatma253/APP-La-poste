const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('nom').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Addresse email existante !');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 2 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
