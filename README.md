## Stack de tecnologias

### **Backend Framework**
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para APIs RESTful

### **Base de Datos**
- **PostgreSQL** - Sistema de base de datos relacional
- **Sequelize** - ORM para modelado y consultas de datos

### **Documentación**
- **Swagger/OpenAPI 3.0** - Especificación para documentación de APIs
- **swagger-jsdoc** - Generación de docs desde comentarios JSDoc
- **swagger-ui-express** - Interfaz web interactiva

### **Desarrollo**
- **nodemon** - Hot reload durante desarrollo
- **dotenv** - Manejo de variables de entorno

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ instalado
- PostgreSQL 13+ instalado y ejecutándose
- Git instalado

### 1. Clonar el Repositorio
git clone https://github.com/LMiguelMendez/gestionUsuariosApi.git
cd gestionUsuariosApi

### 2. Instalar dependencias
npm install

### 3. Configurar Base de Datos
Instalar PostgreSQL Local
- crear base de datos en PostgreSQL:
 *CREATE DATABASE pruebaTecnicaBRM;*

### 4. Configurar variables de entorno
Al nivel de la raiz del proyecto crear un archivo que se llame ".env"
- Editar archivo *.env* tomando en cuenta la siguiente informacion

DB_NAME=pruebaTecnicaBRM
DB_USER=postgres
DB_PASSWORD=tu_password_postgres
DB_HOST=localhost
DB_PORT=5432
PORT=3000

### 5. Ejecutar la aplicacion

Modo Desarrollo *npm run dev*

Modo Produccion *npm start*

# Documentacion API

Swagger UI: http://localhost:3000/api-docs

Endpoints disponibles: Ver documentación interactiva