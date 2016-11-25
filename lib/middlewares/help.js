const _ = require('underscore');
const ejs = require('ejs');
const util = require('util');
let template = ejs.compile(`
<html>
	<head>
		<title>API List</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	</head>
	<body class="container">
		<h1>API LIST</h1>
		<table class="table table-hover table-bordered">
		<% help.forEach(function(api) { %>
			<tr><td><strong>url:</strong></td><td><strong><%= api.path %></strong></td><tr>
			<tr><td><strong>methods:</strong></td><td><%= api.methods %></td><tr>
			<%if (api.params !== 'undefined' ) { %>
				<tr><td><strong>params:</strong></td><td><pre><%= api.params %></pre></td><tr>
			<% } %>
			<%if (api.body !== 'undefined' ) { %>
				<tr><td><strong>body:</strong></td><td><pre><%= api.body %></<pre></td><tr>
			<% } %>
			<%if (api.result !== 'undefined' ) { %>
				<tr><td><strong>return:</strong></td><td><pre><%= api.result %></<pre></td><tr>
			<% } %>
			<tr><td colspan="2">&nbsp;</td></tr>
		<% }) %>
		</table>
	</body>
</html>
`);

module.exports = api =>  async (ctx, next) => {
	if(process.env.NODE_ENV !== 'production') {
		const help = api.stack.filter(layer => layer.methods.length > 0).map(layer => {
			const schemaValidator = _(layer.stack).find({name:'schemaValidator'}) || {};
			return {
				path : layer.path,
				methods: layer.methods, 
				params: util.inspect(schemaValidator.params,{ showHidden: false, depth: null }),
				body:util.inspect(schemaValidator.body,{ showHidden: false, depth: null }),
				result:util.inspect(schemaValidator.result,{ showHidden: false, depth: null })
			};
		})
		api.get('/', ctx => ctx.body = template({help}));
	}
	
	await next();
} 
