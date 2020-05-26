const Order = require('../models/order');
const Product = require('../models/product');

// Get all orders
exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/orders/' + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Create order
exports.orders_create_order = (req, res, next) => {
  // Check if product exist
  Product.findById(req.body.productId)
    .then(product => {
      // check if return product is not empty
      if (!product) {
        return res.status(500).json({
          message: 'Product Not Found'
        });
      }
      const order = new Order({
        product: req.body.productId,
        quantity: req.body.quantity
      });
      return order.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'POST',
          url: 'http://localhost:5000/orders/' + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// Get a single order
exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .then(order => {
      if (!order) {
        return res.status(500).json({
          message: 'Order Not Found'
        });
      }
      res.status(200).json({
        order: {
          _id: order._id,
          product: order.product,
          quantity: order.quantity
        },
        request: {
          type: 'GET',
          url: 'http://localhost:5000/orders'
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// Delete order
exports.orders_delete_order = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:5000/orders',
          body: {
            productId: 'ID',
            quantity: 'Number'
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
