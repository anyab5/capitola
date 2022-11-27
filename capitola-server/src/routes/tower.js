const express = require('express');
const Tower = require('../model/tower');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

//TODO: patch tower to contain current carries list ,
const LAYERS = [
  { name: 'Layer 1', amount: '40000', description: 'The external security webcams', carrierId: '637f51583243f8575b93e77e' },
  { name: 'Layer 2', amount: '80000', description: 'The most guarded wolt area' }
];
const TOWERS = [
  { name: 'Burj Khalifa', userId: '45', description: 'Lorem Ipsum 1', layers: LAYERS },
  { name: 'Jinmao Tower ', userId: '45', description: 'Lorem Ipsum 2', layers: LAYERS }
];

router.get('/get-user-towers', async function (req, res) {
  // I should have the user id from the auth and not as param
  const userId = '45';
  console.log('I am here get user towers');
  let towers = await Tower.find({ userId: userId }, { layers: false });
  console.log(towers);
  if (!towers || !towers.length) {
    towers = await Tower.create(TOWERS);
  }
  console.log(towers);
  res.status(200).json(towers);
});

router.get('/:id', async function (req, res) {
  if (!req.params.id){
    res.status(200).json({})
  }
  console.log('I am here get tower');
  const tower = await Tower.findById(req.params.id);
  res.status(200).json(tower);
});
//
router.post('/:towerId/update-layer', async function (req, res) {
  const body = req.body;
  console.log('I am here post tower', body);
  body.carrierId = body.carrierId ? null : '637f51583243f8575b93e77e';
  const tower = await Tower.updateLayer(req.params.towerId, body);
  console.log(tower);
  res.status(200).json(tower);
});

module.exports = router;
