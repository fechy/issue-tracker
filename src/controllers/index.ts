import Router from 'koa-router';
import agentsRoutes from './agents/routes';
import issuesRoutes from './issues/routes';

const router = new Router();

router.use('/agents', agentsRoutes.routes(), agentsRoutes.allowedMethods());
router.use('/issues', issuesRoutes.routes(), issuesRoutes.allowedMethods());

export default router;
