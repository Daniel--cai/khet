// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';


function hello(_, _$1, callback) {
  var body = {
    message: "Hello from Reason!"
  };
  var response = {
    statusCode: 200,
    body: JSON.stringify(body)
  };
  return callback(null, response);
}

exports.hello = hello;
/* No side effect */