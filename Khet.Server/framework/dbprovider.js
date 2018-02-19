const AWS = require('aws-sdk');
let IS_OFFLINE = process.env.IS_OFFLINE;
IS_OFFLINE = 'true'

module.exports.dbprovider = function(){
    let dynamoDb;    
    if (IS_OFFLINE === 'true') {
        dynamoDb = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
        console.log('offline')
    } else {
        dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    return dynamoDb
}
