const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    phone: { type: String, required: true},
    address: { type: String, required: true}
});

module.exports = mongoose.model('Item', ItemSchema);