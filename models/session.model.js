const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

let Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;
