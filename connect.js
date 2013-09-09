var config = require(__dirname + '/config.json');

var deployd = require('deployd');

var dpd = deployd({
	port: 2403,
	env: config.env
});

process.chdir(__dirname + '/deployd');
dpd.listen();

var address = dpd.options.db.host + ':' + dpd.options.port;
console.log('Started database on ' + address);