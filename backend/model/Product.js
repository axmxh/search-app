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
product.index(
  {
    name: 'text',
    brand: 'text'
  },
  {
    weights: {
      name: 5,
      brand: 1
    }
  }
);

module.exports = mongoose.model('Product', product);
