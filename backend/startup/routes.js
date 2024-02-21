const express = require('express');
const error = require('../middleware/error');
// const Foods = require('../routes/recipes');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (app) {
  app.use(express.json());
  // app.use('/api/food', Foods);
  app.use(cors());
  app.use(bodyParser.json());

  app.use(error); //NOTE: Not calling the function, just passing a reference to the function
};