var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var mongooseUV  = require('mongoose-unique-validator');
/**
* Schema.Types.ObjectId
* The internal type mongoose uses to store the ids of the id
* automatically created by mongoose.
* ref
* tells mongoose it holds a connection to another model
**/
var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

schema.plugin(mongooseUV);

module.exports = mongoose.model('Admin', schema);
