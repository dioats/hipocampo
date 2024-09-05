const { Sequelize } = require('sequelize')

const sequelize = new Sequelize ('test', 'root', '1425', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch(erro) {
    console.log(`Nao foi possivel conectar: ${erro}`)
}

module.exports = sequelize