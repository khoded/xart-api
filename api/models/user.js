const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  firstname: {type: String, required:true},
  lastname: {type: String, required:true},
  phone: {type: Number, required:true},
  username: {type: String, required:true},
  usertype: {type: String, required:true}
});

module.exports = mongoose.model('User', userSchema);
