"use strict";
//import * as mongoose from 'mongoose';
var mongoose = require("mongoose");
const envConfig = require('../../config/envConfig');
const logger = require('../../helpers/logger');
mongoose.connect(envConfig.MONGO_URI, function (err) {
    logger.error(err);
});
var db = mongoose.connection;
db.on('error', function (error) {
    logger.error(error);
    throw error;
});
db.once('open', function () {
    // we're connected!
    console.log("Connection to mongodb opened");
    //   var userSchema = mongoose.Schema({
    //     username: String    
    //   });
    //   var User = mongoose.model('User', userSchema);
    //   var testUser = new User({username: 'Gigel'});
    //   testUser.save(function(err, user){
    //      if(err){
    //          logger.error(err);
    //      } 
    //      else{
    //          console.log(JSON.stringify(user));
    //      }
    //   });
});
module.exports = mongoose;
