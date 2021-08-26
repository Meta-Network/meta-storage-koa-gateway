const app = require('../src/app');

module.exports = (req, res) => {
  app.callback()(req, res);
};
