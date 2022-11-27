const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: {type: String, index: true},
    name: String,
    email: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);