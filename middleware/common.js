/**
 * Common middleware that we have to use by default every time
 * @author Shuja Naqvi
 */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Common Middleware
module.exports = (app) => {
  app.use(cors({ origin: 'http://localhost:3000' })); // CORS (Cross Origin Policy) to restrict unknown requests
  app.use(logger('dev')); // Morgan - to log every request in console
  app.use(express.urlencoded({ extended: true })); // to get url encoded data from requests
  app.use(express.json()); // to send json data in response (It's mandatory in rest api's)
};
