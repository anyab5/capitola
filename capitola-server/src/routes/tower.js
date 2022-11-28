const express = require('express');
const Tower = require('../model/tower');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const LAYERS = [
  { name: 'Layer 1', amount: '40000', description: 'The external security webcams', carrierId: '637f51583243f8575b93e77e' },
  { name: 'Layer 2', amount: '80000', description: 'The most guarded wolt area' }
];
const TOWERS = [
  { name: 'Burj Khalifa', userId: '638497fb2c8f906b6e954487', description: 'Lorem Ipsum 1', layers: LAYERS },
  { name: 'Jinmao Tower ', userId: '638497fb2c8f906b6e954487', description: 'Lorem Ipsum 2', layers: LAYERS }
];

router.get('/get-user-towers', async function (req, res) {
  // If we have auth in place we should have the user id from the auth flow
  const userId = '638497fb2c8f906b6e954487';
  let towers = await Tower.find({ userId: userId }, { layers: false });

  if (!towers || !towers.length) {
    //this is done only to make life easier for tester
    towers = await Tower.create(TOWERS);
  }
  res.status(200).json(towers);
});

router.get('/:id', async function (req, res) {
  if (!req.params.id || req.params.id === 'undefined') {
    return res.status(404).json({});
  }
  const tower = await Tower.findById(req.params.id);
  res.status(200).json(tower);
});

router.post('/:towerId/update-layer', async function (req, res) {
  const body = req.body;
  const tower = await Tower.updateLayer(req.params.towerId, body);
  res.status(200).json(tower);
});

module.exports = router;
