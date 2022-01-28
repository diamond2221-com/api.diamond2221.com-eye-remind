import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { GetMiddlewareOptions } from 'apollo-server-koa/dist/ApolloServer';

export type ExtendedConfig = DefaultConfig & {
  apollo: GetMiddlewareOptions;
};

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as ExtendedConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616377773051_890';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.apollo = {
    path: '/graphql/query',
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // token 在请求头中的 名称
  config.auth_headers_name = 'client-token';
  config.jwtSecret = 'diamond';

  config.multipart = {
    mode: 'file',
  };

  config.postImgConf = '';
  // "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/format,jpg/watermark,text_ZGlhbW9uZDIyMjEuY29t,color_ffffff,size_10,shadow_100,x_1,y_1";

  return config;
};
