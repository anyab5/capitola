const express = require('express');
const router = express.Router();

const Carrier = require('../model/carrier');

const CARRIERS = [
  { name: 'AIG' },
  { name: 'Alianz' },
  { name: 'AXA' },
  { name: 'Zurrich Insurance' },
  { name: 'Chubb' },
  { name: 'Harel' }
];

router.get('/get-all', async function (req, res) {
  console.log("get all carriers");

  // I assume that in real life the carriers should somehow be relevant to specific brokers,
  // so we will not really be fetching them without any condition.
  // For now, to avoid pagination I decided to simple limit
  let carriers = await Carrier.find().limit(100);
  console.log(carriers)
  if (!carriers || !carriers.length) {
    carriers = await Carrier.create(CARRIERS);
  }
  console.log(carriers);
  res.status(200).json(carriers);
});

module.exports = router;
