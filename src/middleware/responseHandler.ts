import KoaContext from '../types/koa-context.type';

/**
 * Centralized response handler
 */
async function responseHandler (ctx: KoaContext, next: Function) : Promise<void> {
  try {
    const result = await next();
    ctx.body = { result };
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message,
      code: ctx.status
    };

    ctx.app.emit('error', err, ctx);
  }
}

export default responseHandler;
