import { Router } from 'express';
import CarroRepositorio from '../infra/CarroRepositorio';
import CarroController from './CarrosController';

const routes = Router();
const carroRepositorio = new CarroRepositorio;
const carroController = new CarroController(carroRepositorio);

routes.use('/carros', carroController.router);

export default routes;