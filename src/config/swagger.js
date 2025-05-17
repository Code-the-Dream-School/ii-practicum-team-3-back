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
        url: 'http://localhost:3000/api/v1', 
      },
    ],
  },

  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
