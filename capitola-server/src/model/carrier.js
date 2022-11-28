const mongoose = require('mongoose');

// It is probable that there is a need to find all carrier towers,
// we can have that be elemMatch on indexed carrierId in tower layer or add towerId in this schema as well
const carrierSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carrier', carrierSchema);
