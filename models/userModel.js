var mongo = require('mongoose');

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id : ObjectId,
    username : String,
    password : String,
    nama : String,
    email : String,
    telepon : Number,
});

var userModel = mongo.model('user', UserSchema);

module.exports = userModel;