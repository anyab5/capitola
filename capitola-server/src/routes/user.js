const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get('/', async function (req, res) {
  //should get here the userId from the auth data
  const userId = '45';
  let user = await User.findById(userId);
  if (!user){
    let newVar = { _id: userId, name: 'Ethan Hunt', email: 'ethan@hunt.com' };
    user = await new User(newVar).save();
  }
  console.log(user);
  res.status(200).json(user);
});

module.exports = router;
