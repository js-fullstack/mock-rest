const Router = require('koa-router');
const jsf = require('json-schema-faker');
const validate = require('../middlewares/validator');

module.exports = api => (path, schema) => {
	const router = new Router();
	schema.forEach(mount => {
		router[mount.method](mount.path, validate(mount), async (ctx, next) => {
			if(mount.result) {
				ctx.body = jsf(mount.result);
			} else {
				ctx.body = undefined;
			}
		})
	});
	api.use(path, router.routes(), router.allowedMethods());
}