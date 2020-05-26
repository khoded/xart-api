const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// morgan
app.use(morgan('dev'));
// set static and public for upload folder
app.use('/uploads', express.static('uploads'));
// body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// cors
app.use(cors());

// mongoDB connection
const uri = `mongodb+srv://liem:${process.env.MONGODB_PASS}@cluster0-a6es6.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

// error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
