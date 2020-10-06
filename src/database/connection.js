const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'test';
const config = require('./config')[env];

const connection = new Sequelize(config);

try {
	connection.authenticate();
	console.log("conectado!");
} catch (error) {
	console.error("falha: ", error);
}


module.exports = connection
