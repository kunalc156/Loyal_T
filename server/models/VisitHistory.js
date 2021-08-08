const { Schema, model } = require('mongoose');

const visitHistorySchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  visitDate: {
    type: Date,
  }
});


const VisitHistory = model('VisitHistory', visitHistorySchema);

module.exports = VisitHistory;
