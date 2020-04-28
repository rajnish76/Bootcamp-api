const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:resettoken', resetPassword);

router.get('/me', protect, getMe);

router.put('/updatedetail', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

module.exports = router;
