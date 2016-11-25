# mock-rest

## Description & Features

Mocked Web Server, providing REST service driving by json-schema. Only run on ES7+.

## Pre Install
node version 7.0.0+

## Install

      npm install mock-rest


## Sample

```

const mock = require('./index')('/api');

const user = {  //align json-schema
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

mock('/users',[{
	{ // get all
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
		body : {  //align json-schema
	        type:'object',
	        properties : {
	            username: {type : 'string'},
	            passwd: {type: 'string'},
	            tenant: {type: 'integer'}
	        },
	        required : ['username','passwd','tenant']
    	},
    	result : user
	}
}]);

mock.listen(3000);

```
Now, access site http://yourhost:3000/api



