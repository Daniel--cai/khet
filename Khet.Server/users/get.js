'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const { dbprovider } = require('../framework/dbprovider')
let dynamoDb = dbprovider();

module.exports = {
  one: (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id
      }
    }

    dynamoDb.get(params, (err, result) => {
      if (err) {
        console.error(err);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
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
  },
  list: (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    }

    let items = [];

    const scanExecute = function (callback) {
      dynamoDb.scan(params, (err, result) => {
        if (err) {
          console.error(err);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Can not the fetch the item'
          })
          return;
        }
        items = items.concat(result.Items);
        if (result.LastEvaluatedKey) {
          params.ExclusiveStartKey = result.LastEvaluatedKey;

        } else {
          const response = {
            statusCode: 200,
            body: JSON.stringify(items),
          }
          callback(null, response);
        }
      })
    }
    scanExecute(callback)
  }
}