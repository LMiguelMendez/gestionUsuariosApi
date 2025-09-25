# Arquitectura por Capas

##
src/
├── controllers/     # Lógica de endpoints HTTP
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── entities/        # Entidades de dominio
├── models/          # Modelos de Sequelize
├── routes/          # Definición de rutas
├── config/          # Configuración
└── app.js          # Punto de entrada
##

- Implementé una arquitectura por capas que combina varios patrones:

- Repository Pattern para abstraer el acceso a datos

- Service Pattern para la lógica de negocio

- MVC adaptado para la estructura HTTP

- Entities para un modelo de dominio rico

- MVC (Model-View-Controller) Adaptado

 * Model: Entities + Repository (estructura de datos y persistencia)

 * View: Respuestas JSON (representación de datos)

 * Controller: Manejo de requests/responses HTTP

HTTP Request > Controller > Service > Repository > Database
HTTP Response < Controller < Service < Repository < Database

¿Por que lo realice de esta manera?

- Separar responsabildiades: Cada capa tiene una responsabilidad única

- Escalabilidad: Fácil agregar nuevas funcionalidades

- Flexibilidad: Puedo cambiar la base de datos sin reescribir lógica de negocio

- Mantenibilidad: Código más organizado y legible