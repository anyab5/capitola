const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');

const USER = { _id: mongoose.Types.ObjectId('638497fb2c8f906b6e954487'), name: 'Ethan Hunt', email: 'ethan@hunt.com' };

router.get('/', async function (req, res) {
  // If we have auth in place we should have the user id from the auth flow
  const userId = '638497fb2c8f906b6e954487';
  let user = await User.findById(userId);
  if (!user){
    //this is done only to make life easier for tester
    user = await new User(USER).save();
  }
  res.status(200).json(user);
});

module.exports = router;
