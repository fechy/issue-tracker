/**
 * Centralized response handler
 */
module.exports = async (ctx, next) => {
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
};
