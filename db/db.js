const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
})

try {
	sequelize.authenticate();
	console.log('Successfully connected to database')
} catch (err) {
	console.log(`Error connecting to database: ${err}`)
}

module.exports = sequelize;