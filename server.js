const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { appPort } = require('./config');
const { responseHandler } = require('./src/middleware');
const controllerRoutes = require('./src/controllers');
const database = require('./src/database');

const app = new Koa();
app.use(bodyParser());

app.use(responseHandler);

app.use(controllerRoutes.routes());


(async () => {
  try {
    // Try DB connection first
    await database.authenticate();

    app.use((ctx, next) => {
      ctx.state.database = database;
      next();
    });

    app.listen(appPort, () => {
      console.log(`App listening on ${appPort}`);
    });
  } catch (err) {
    console.error(err);
  }
})();

