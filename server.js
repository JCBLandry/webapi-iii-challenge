const express = require('express');
const userRouter = require('./users/userRouter.js')
const morgan = require('morgan');
const server = express();

server.use(morgan('dev'));
server.use(express.json())
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

// function logger(req, res, next) {

// };

module.exports = server;
