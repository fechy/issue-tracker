const Router = require('@koa/router');
const IssuesController = require('./controller');

const router = new Router();
const controller = new IssuesController();

router.get('/', controller.getOpen);
router.post('/create', controller.createIssue);
router.post('/:id/resolve', controller.resolveIssue);

module.exports = router;
