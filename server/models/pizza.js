var mongoose = require('mongoose');


var PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  pepperoni: Boolean,
  sausage: Boolean,
  bacon:Boolean,
  beef: Boolean,
  meatball: Boolean,
  chicken: Boolean,
  pork: Boolean,
  salami: Boolean,
  ham: Boolean,
  mushrooms: Boolean,
  green_peppers: Boolean,
  black_olives: Boolean,
  banana_peppers: Boolean,
  cherry_peppers: Boolean,
  jalepeno: Boolean,
  onion: Boolean,
  pineapple: Boolean,
  spinach: Boolean,
  tomatoes: Boolean,
});

var Pizza = mongoose.model('Pizza', PizzaSchema);

module.exports = {
  Pizza: Pizza
}