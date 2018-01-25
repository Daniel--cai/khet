'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  }

  dynamoDb.get(params, (err, result) => {
    if (err){
      console.error(err);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Can not the fetch the item'
      })
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }
    callback(null, response);
  })
}
