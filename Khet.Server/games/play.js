'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  var params = {
    Item: {
      id: uuid.v1(),
      name: event.name
    },
    TableName: process.env.DYNAMODB_TABLE
  };

  dynamoDb.put(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};

module.exports.move = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Moved',
      input: event,
    }),
  };

  const turnNumber = 1;

  var params = {
    Move: {
      id: uuid.v1(),
      gameId: uuid.v1(),
      player: event.player,
      move: event.move,
      turnNumber: turnNumber
    },
    TableName: process.env.DYNAMODB_TABLE
  };

  dynamoDb.put(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};
