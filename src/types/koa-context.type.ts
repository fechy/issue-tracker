import {ExtendableContext, Request} from 'koa';

type KoaContext = {
  params: {
    [key: string]: any
  }
  request: {
    body: {
      [key: string]: any
    }
  } & Request
} & ExtendableContext;

export default KoaContext;
