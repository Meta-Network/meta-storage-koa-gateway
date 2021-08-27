const Router = require('@koa/router');

const jwtAuth = require('../../middlewares/jwt-auth');
const upload = require('../../middlewares/upload');
const storage = require('./storage');

const router = new Router();
router.get('/storage', storage.get);
router.post('/storage', jwtAuth, upload, storage.post);

module.exports = router;
