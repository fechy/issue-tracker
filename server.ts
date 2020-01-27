import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { appPort } from './config';
import responseHandler from './src/middleware';
import controllerRoutes from './src/controllers';
import database from './src/database';

const app = new Koa();

app.use(bodyParser());
app.use(responseHandler);
app.use(controllerRoutes.routes());

(async (): Promise<void> => {
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

