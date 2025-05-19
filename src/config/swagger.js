// src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness App API',
      version: '1.0.0',
      description: 'API documentation for the fitness app backend (exercises, users, workouts)',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
