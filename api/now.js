const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', path.join(__dirname, '../src'));

const app = require('../src/app');

module.exports = (req, res) => {
  app.callback()(req, res);
};
