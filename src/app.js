const express = require('express');
const sequelize = require('./config/database');
const { swaggerUi, specs } = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

async function startServer() {
  try {

    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente.');
    
    await sequelize.sync({ force: false }); 
    console.log('Modelos sincronizados con la base de datos.');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();