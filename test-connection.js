require('dotenv').config();
const sequelize = require('./src/config/database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL exitosa!');
    console.log('Base de datos:', process.env.DB_NAME);
    console.log('Host:', process.env.DB_HOST);
    console.log('Usuario:', process.env.DB_USER);
  } catch (error) {
    console.error('Error de conexión:', error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();