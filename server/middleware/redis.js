var redis = require('redis');
var config = require('../config')
var client = redis.createClient({
    host : 'redis-19082.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port : 19082,
    password : config.redis.pass
})

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err.message);
});

module.exports = client;