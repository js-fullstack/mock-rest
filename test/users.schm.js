const user = {
	type : 'object',
	properties : {
		id: {type: 'string'},
        username: {type : 'string'},
        tenents: {
        	type: 'array',
        	items: {type: 'integer'}
        }
	},
	required : ['id', 'username', 'tenents']
};

const schema = module.exports = [
	{ //all
		path: '/',
		method : 'get',
		result : {
			type : 'array',
			items : user
		}
	},
	{ //one
		path: '/:id',
		method: 'get',
		result: user
	},
	{ //create
		path: '/',
		method : 'post',
		body : {
	        type:'object',
	        properties : {
	            username: {type : 'string'},
	            passwd: {type: 'string'},
	            tenant: {type: 'integer'}
	        },
	        required : ['username','passwd','tenant']
    	},
    	result : user
	},
	{ //update
		path: '/:id',
		method : 'put',
		params : {
			type: 'object',
			properties : {
				id:'string'
			},
			required: ['id']
		},
		body : {
			type: 'object',
			properties : {
				passwd : {type: 'string'}
			},
			required: ['passwd']
		},
		result : user
	},
	{ //delete
		path : '/',
		method : 'delete',
		result: user
	}
];