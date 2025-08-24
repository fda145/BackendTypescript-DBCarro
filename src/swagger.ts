import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Carros',
        version: '1.0.0',
        description: 'Documentação da API para consulta e gerenciamento de veículos',
      },
    },
    apis: ['./src/Api/*.ts'], // Caminho para onde estão suas rotas
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;