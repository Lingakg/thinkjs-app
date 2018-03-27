const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const path = require('path');
import { think } from "thinkjs";
const isDev = think.env === "development";
const redisCache = require('think-cache-redis');
const redisSession = require('think-session-redis');
/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'redis',
  common: {
      timeout: 24 * 3600 * 1000 // millisecond
  },
  redis: {
      handle: redisCache,
      port: 6379,
      host: '192.168.39.115',
      password: ''
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: (msg: string) => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'wechat',
    prefix: 'wechat_',
    encoding: 'utf8',
    host: '59.110.143.125',
    port: '3306',
    user: 'root',
    password: '199752013cwl512',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'redis',
    common: {
        cookie: {
            name: 'thinkjs',
            // maxAge: '',
            // expires: '',
            path: '/',  // a string indicating the path of the cookie
            // domain: '',
            // secure: false,
            // keys: [],
            httpOnly: true,
            sameSite: false,
            signed: false,
            overwrite: false
        }
    },
    redis: {
        handle: redisSession,
        port: 6379,
        host: '192.168.39.115',
        password: '',
        maxAge: 3600 * 1000, // session timeout, if not set, session will be persistent.
        autoUpdate: false, // update expired time when get session, default is false
    }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};
