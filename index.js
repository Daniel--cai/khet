const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE
let dynamoDb;

const IS_OFFLINE = process.env.IS_OFFLINE;
if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })
    console.log(dynamoDb);
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
    res.send('Hellow Wordl')
})


module.exports.handler = serverless(app);