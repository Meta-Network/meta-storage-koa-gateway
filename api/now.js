const path = require('path');

const app = require('../src/app');

module.exports = (req, res) => {
  app.callback()(req, res);
};
