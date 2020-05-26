const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  details: {
    breadth:{ type: Number},
    width: { type: Number }
  },
  tag:{type: Array},
  status: { type: String, required: true },
  productImage: { type: String, required: true },
  user: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
