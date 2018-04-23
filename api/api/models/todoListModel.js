var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TodoItemSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  quantity: {
    type: Number,
    required: 'Kindly enter the quantity'
  },
  unit: {
    type: String,
    required: 'Kindly Enter a unit'
  },
  // modified: {
  //   type: Date,
  //   default: new Date()
  // },
  // bought: {
  //   type: Boolean,
  //   default: false
  // }
});

var BoughtItemSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  quantity: {
    type: Number,
    required: 'Kindly enter the quantity'
  },
  unit: {
    type: String,
    required: 'Kindly Enter a unit'
  }
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);
module.exports = mongoose.model('BoughtItem', BoughtItemSchema);