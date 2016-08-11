var bunyan = require('bunyan')
var EmailStream = require('../').EmailStream
var stubTransport = require('nodemailer-stub-transport')

var emailStream = new EmailStream({
  to: 'me@example.com'
}, stubTransport())

var myLogger = bunyan.createLogger({
  name: 'SleepBreaker',
  streams: [{
    type: 'raw', // You should use EmailStream with 'raw' type!
    stream: emailStream,
    level: 'fatal'
  }
  // Some other streams you want
  ]
})

myLogger.fatal(new Error('No sweet sleep anymore'), 'Something bad happened')

emailStream.on('mailSent', function (info) {
  console.log(info.response.toString())
})
