import { EggAppConfig, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;
const redisStore = require('cache-manager-ioredis');

export default (): DefaultConfig => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '981220Zy+++',
    database: 'db_eye_remind',
    synchronize: false,
    logging: true,
  };

  config.cache = {
    store: redisStore,
    options: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '981220Zy+++',
      db: 0,
      keyPrefix: 'cache:',
      ttl: 100,
    },
  };

  return config;
};
