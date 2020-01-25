const Router = require('@koa/router');
const agentsRoutes = require('./agents/routes');
const issuesRoutes = require('./issues/routes');

const router = new Router();

router.use('/agents', agentsRoutes.routes(), agentsRoutes.allowedMethods());
router.use('/issues', issuesRoutes.routes(), issuesRoutes.allowedMethods());

module.exports = router;
