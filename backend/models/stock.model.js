const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  username: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  current_value: { type: Number, required: false },
  transaction_type: { type: String, required: true },
  transaction_date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;