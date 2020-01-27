import Router from 'koa-router';
import IssuesController from './controller';
import {Middleware} from 'koa';

const router = new Router();
const controller = new IssuesController();

const emptyMiddleware: Middleware<{}> = (ctx, next) => {}

router.get('/', emptyMiddleware, controller.getOpen);

// @ts-ignore
router.post('/create', controller.createIssue);
// @ts-ignore
router.post('/:id/resolve', emptyMiddleware, controller.resolveIssue);

export default router;
