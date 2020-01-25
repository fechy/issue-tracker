const Router = require('@koa/router');
const IssuesController = require('./controller');

const router = new Router();
const controller = new IssuesController();

router.get('/', controller.getOpen);

module.exports = router;
