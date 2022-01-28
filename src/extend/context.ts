import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
export class ContextUtil {
  @Inject()
  ctx: Context;

  getUid(): string {
    return this.ctx.request.header['client-uid'] as string;
  }
  getInfo(): string {
    return this.ctx.request.header['client-info'] as string;
  }
}
