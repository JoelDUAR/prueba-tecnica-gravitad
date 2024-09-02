import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Test Gravity API',
      version: '1.0.0',
      description: 'API documentation for Test Gravity',
      contact: {
        name: 'Joel Dupraz',
        email: 'joel_dupraz@hotmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Aquí defines las rutas para escanear
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};