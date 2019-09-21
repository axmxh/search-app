let express = require('express');
let app = express();
const cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

app.use(cors());
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
let db = 'mongodb://localhost/products';
/*  
    db.products.insertMany( data.json )
*/
// connect
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB conected!');
  })
  .catch(err => {
    console.log(err);
  });

// Load Product model
const Product = require('./model/Product');
// PORT
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  Product.find().then(products => {
    if (!products) {
      res.status(404).json({ msg: 'there are no products!' });
      return;
    }
    res.status(200).json(products);
  });
});

app.post('/', (req, res) => {
  const term = req.query.q;
  const cat = req.query.s;
  if (term) {
    Product.find({
      $text: { $search: term }
    }).then(products => {
      if (!products) {
        res.status(404).json({ msg: 'there are no products!' });
        return;
      }
      res.status(200).json(products);
    });
  } else if (cat) {
    Product.find({ 'category.id': cat }).then(products => {
      if (!products) {
        res.status(404).json({ msg: 'there are no products!' });
        return;
      }
      res.status(200).json(products);
    });
  }
});

app.listen(PORT, () => {
  console.log(`app runing on port ${PORT}`);
});
