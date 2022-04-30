const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');
const token = require('../configs/token.js');
const emailService = require('../services/emailService.js');
const jwt_decode = require('jwt-decode');

const {
   use
} = require('../routes/authen.js');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');

const rce = asyncHandler(async (req, res) => {
   if (req.cookies.profile) {
      var str = new Buffer(req.cookies.profile, 'base64').toString();
      var obj = serialize.unserialize(str);
      if (obj.username) {
         res.send("Hello " + escape(obj.username));
      }
   } else {
      res.cookie('profile', "eyJ1c2VybmFtZSI6ImFqaW4iLCJjb3VudHJ5IjoiaW5kaWEiLCJjaXR5IjoiYmFuZ2Fsb3JlIn0=", {
         maxAge: 900000,
         httpOnly: true
      });
   }
   // if (req.cookies.accessToken) {
   //    // var str = new Buffer(req.cookies.accessToken, 'base64').toString();
   //    var str = jwt_decode(req.cookies.accessToken);
   //    var obj = serialize.unserialize(str);
   //    if (obj.username) {
   //       res.send("Hello " + escape(obj.username));
   //    }
   // }
   res.send("Hello World");
});

module.exports = {
   rce
};