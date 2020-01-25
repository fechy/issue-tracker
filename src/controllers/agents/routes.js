const Router = require('@koa/router');
const AgentsController = require('./controller');

const router = new Router();
const controller = new AgentsController();

router.get('/', controller.getAvailable);

module.exports = router;
