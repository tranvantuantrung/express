const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

const Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;
