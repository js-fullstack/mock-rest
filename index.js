const Koa = require('koa');

const timeout = require('koa-timeout-v2');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const xTime = require('koa-xtime');

const accLogger = require('./lib/middlewares/acc-logger');
const error = require('./lib/middlewares/error');
const etag = require('./lib/middlewares/etag');
const help = require('./lib/middlewares/help');
const Router = require('koa-router');


module.exports = mount => {
	const app = new Koa();
	const api = Router({prefix: '/api'});

	const mock = require('./lib/common/mock')(api);

	app.proxy = true;
	app.use(helmet());
	app.use(accLogger());
	app.use(error());
	app.use(xTime());
	app.use(bodyParser());
	app.use(compress());
	app.use(timeout(500));
	app.use(help(api));
	app.use(etag());
	app.use(api.routes());
	app.on('error', err => global.logger.error(err));

	const result =  (path, schema) => {
		mock(path, schema);
	};

	result.listen = port => {
		app.listen(port);
	}

	return result;
} 



