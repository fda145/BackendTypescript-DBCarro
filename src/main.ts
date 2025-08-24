import routes from './Api/routes';
import express, { NextFunction, Request, Response } from 'express';
import logger from './infra/logger';
import { basicAutMiddleware } from './basicAuth';
import CustomErro from './Api/Exceptions/CustomError';
import { Express } from 'express-serve-static-core';
import { setupSwagger } from './swagger';

const app = express();
const port = 3000;

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {

  if (error instanceof CustomErro){
      return res.status(error.getStatus()).json({
       error: error.message,
       status: error.getStatus()
     });
  }

  const message = 'Erro no servidor';
  const status = 500;
  console.error('status: ', status, 'message', error.message);
  
  return res.status(status).json({
  error: message,
  status: status
  });
}

app.use(express.json());

app.use(logger.init());

app.use(basicAutMiddleware);

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json('Bem-vindo à API Carros! Utilize esta plataforma para consultar informações sobre veículos de maneira prática e organizada.');
});

app.use(errorHandler);

// Ativa Swagger
setupSwagger(app);

app.listen(port,() => {
  console.log(`Servidor rodando em http://localhost:${port}`);

});

