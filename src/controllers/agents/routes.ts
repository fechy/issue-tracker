import Router from 'koa-router';
import AgentsController from './controller';

const router = new Router();
const controller = new AgentsController();

router.get('/', controller.getAvailable);
router.get('/:id/free', ctx => controller.freeAgent(ctx.params.id));

export default router;
