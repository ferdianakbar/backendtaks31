var restify = require('restify');
var server = restify.createServer();
var restifyValidator = require('restify-validator');
var mongo = require('mongoose');
var db = require('./config/db.js');
var setupControl = require('./controller/setupControl.js');
var userControl = require('./controller/userControl.js');

mongo.connect(db.getMongoConenct());
setupControl(server, restify, restifyValidator);
userControl(server);

server.listen(8008, function(){
   console.log('server runing on ', server.name, server.url) 
});