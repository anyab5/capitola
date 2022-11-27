const mongoose = require('mongoose');
const layerSchema = new mongoose.Schema({
  name: String,
  carrierId: mongoose.Schema.Types.ObjectId,
  description: String,
  amount: String
});
const towerSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: { type: Date, default: Date.now },
  userId: { type: String, index: true },
  layers: [layerSchema]
});

towerSchema.statics.updateLayer = function (towerId, layerData) {
  const query = {
    _id: towerId,
    'layers._id': layerData._id
  };
  delete layerData._id;
  const update = {
    [`layers.$`]: layerData
  };
  return this.findOneAndUpdate(query, { $set: update  }, { new: true });
};
//,,
module.exports = mongoose.model('Tower', towerSchema);
