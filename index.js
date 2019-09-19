let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

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

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Search app!');
});

app.get('/products', (req, res) => {
  Product.find().then(products => {
    if (!products) {
      res.status(404).json({ msg: 'there are no products!' });
      return;
    }
    console.log(products);
    res.status(200).json(products);
  });
});

app.listen(PORT, () => {
  console.log(`app runing on port ${PORT}`);
});
