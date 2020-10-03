const { Sequelize } = require('sequelize');

const config = require('./config');

const connection = new Sequelize(config);

try {
	connection.authenticate();
	console.log('conectado ao banco!');
} catch (error) {
	console.error('falha: ', error);
}


module.exports = connection;