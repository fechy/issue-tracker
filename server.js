const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { appPort } = require('./config');
const { responseHandler } = require('./src/middleware');
const controllerRoutes = require('./src/controllers');

const app = new Koa();
app.use(bodyParser());
app.use(responseHandler);

app.use(controllerRoutes.routes());

app.listen(appPort, () => {
  console.log(`App listening on ${appPort}`);
});
