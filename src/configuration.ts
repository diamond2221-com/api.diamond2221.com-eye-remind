import { App, Configuration } from '@midwayjs/decorator';
// eslint-disable-next-line node/no-extraneous-import
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';
import * as cache from '@midwayjs/cache'; // 导入cacheComponent模块
import { ContextUtil } from './extend/context';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
    // cache,
  ],
  importConfigs: [],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady(): Promise<void> {
    // this.app.use(await this.app.generateMiddleware('GraphQLMiddleware'));

    this.app
      .getApplicationContext()
      .registerObject('contextUtil', new ContextUtil());
  }
}
