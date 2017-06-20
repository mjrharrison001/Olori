var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var mongooseUV  = require('mongoose-unique-validator');

var schema = new Schema({
  numberOfUsers: {type: Number, required: false},
  numberOfKeys: {type: Number, required: false},
  numberOfActiveUsers: {type: Number, required: false},
  updateTimer: {type: Number, required: false},
  lastSuccessfulUpdate: {type: Date, default: Date.now}
});

schema.plugin(mongooseUV);

module.exports = mongoose.model('Server', schema);
