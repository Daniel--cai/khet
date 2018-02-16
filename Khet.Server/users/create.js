'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const bodyParser = require('body-parser');

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE
let dynamoDb;

let IS_OFFLINE = process.env.IS_OFFLINE;
IS_OFFLINE = 'true'
if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
	})
	console.log('offline')
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports.create = (event, context, callback) => {

	console.log(event.body)
	const data = JSON.parse(event.body)
	if (typeof data.name !== 'string' || typeof data.email !== 'string') {
		callback(new Error("Name or Email cannot be empty"))
		console.log('empty')
		return;
	}

	var params = {
		Item: {
			id: uuid.v1(),
			name: data.name,
			email: data.email
		},
		TableName: process.env.DYNAMODB_TABLE
	};


	dynamoDb.put(params, function (err, data) {
		if (err) {
			callback(err, null);
		} else
		console.log(data)
		const response = {
			statusCode: 200,
			body: JSON.stringify("USER CREATED")
		}
		callback(null, response);
	})
};
