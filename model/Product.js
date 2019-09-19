const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  name: String,
  image: String,
  price: Number,
  category: {
    id: Number,
    name: String
  },
  brand: String
});

module.exports = mongoose.model('Product', product);
