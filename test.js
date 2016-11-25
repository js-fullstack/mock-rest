const mock = require('./index')('/api');
mock('/users',require('./test/users.schm'));
mock.listen(3000);