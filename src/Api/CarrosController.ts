import { Router, Request, Response } from 'express';
import CarroRepositorio from '../infra/CarroRepositorio';
import { AtualizarCarroDTO, CriarCarroDTO, Carro, ViewCarroDTO} from '../Carros';
import { CarroSchema } from '../infra/CarroSchema';
import { body, param, validationResult } from 'express-validator';
import NotFoundException from './Exceptions/NotFoundException';

class CarroController {
    private readonly carroRepositorio : CarroRepositorio;
    public router : Router = Router();

    constructor(carroRepositorio: CarroRepositorio){
        this.carroRepositorio = carroRepositorio;
        this.routes();
    }

    public routes(){
        /**
        * @openapi
        * /carros:
        *   get:
        *     summary: Lista todos os carros
        *     tags:
        *       - Carros
        *     responses:
        *       200:
        *         description: "Lista de todos os carros"
        *         content:
        *           application/json:
        *             schema:
        *               type: array
        */
        this.router.get('/', this.buscarCarros.bind(this) );

        /**
        * @openapi
        * /carros/{id}:
        *   get:
        *     summary: Busca um carro pelo ID
        *     tags:
        *       - Carros
        *     parameters:
        *       - in: path
        *         name: id
        *         schema:
        *           type: integer
        *         required: true
        *         description: "ID do carro"
        *     responses:
        *       200:
        *         description: Carro encontrado
        *       404:
        *         description: Carro não encontrado
        */
        this.router.get('/:id',[
            param('id').notEmpty().isNumeric().withMessage('id deve ser númerico.')
        ], this.buscarCarroPorId.bind(this));

        /**
        * @openapi
        * /carros/tipo/{tipo}:
        *   get:
        *     summary: Busca carros pelo tipo
        *     tags:
        *       - Carros
        *     parameters:
        *       - in: path
        *         name: tipo
        *         schema:
        *           type: string
        *         required: true
        *         description: "Tipo do carro (ex: Classicos, Esportivo, Luxo)"
        *     responses:
        *       200:
        *         description: Lista de carros encontrados
        *       404:
        *         description: Nenhum carro encontrado
        */

        this.router.get('/tipo/:tipo',[
            param('tipo').notEmpty().isString().withMessage('tipo do carro deve ser texto.')
        ], this.buscarCarroPorTipo.bind(this));

        /**
        * @openapi
        * /carros:
        *   post:
        *     summary: Cria um novo carro
        *     tags:
        *       - Carros
        *     requestBody:
        *       required: true
        *     responses:
        *       201:
        *         description: Carro criado com sucesso
        *       400:
        *         description: Requisição inválida (campos obrigatórios ou formato incorreto)
        */

        this.router.post('/',[
            body('nome')
            .exists().withMessage('O campo nome é obrigatório')
            .isString().withMessage('O campo nome deve ser tipo texto'),
            body('descricao')
            .exists().withMessage('O campo descrição é obrigatório')
            .isString().withMessage('O campo descrição deve ser tipo texto'),
            body('tipo')
            .exists().withMessage('O campo tipo é obrigatório')
            .isString().withMessage('O campo tipo deve ser tipo texto'),
            body('ativo')
            .exists().withMessage('O campo ativo é obrigatório')
            .isBoolean().withMessage('O campo ativo deve ser um boolean')
        ], this.criarCarro.bind(this));

        /**
        * @openapi
        * /carros/{id}:
        *   patch:
        *     summary: Atualiza um carro pelo ID
        *     tags:
        *       - Carros
        *     parameters:
        *       - in: path
        *         name: id
        *         schema:
        *           type: integer
        *         required: true
        *         description: "ID do carro a ser atualizado"
        *     requestBody:
        *       required: true
        *     responses:
        *       200:
        *         description: Carro atualizado com sucesso
        *       404:
        *         description: Carro não encontrado
        */

        this.router.patch('/:id',this.AtualizarCarroPorId.bind(this));

        /**
        * @openapi
        * /carros/{id}:
        *   delete:
        *     summary: Deleta um carro pelo ID
        *     tags:
        *       - Carros
        *     parameters:
        *       - in: path
        *         name: id
        *         schema:
        *           type: integer
        *         required: true
        *         description: "ID do carro a ser deletado"
        *     responses:
        *       200:
        *         description: Carro deletado com sucesso
        *       404:
        *         description: Carro não encontrado
        */

        this.router.delete('/:id', this.deletarCarroPorId.bind(this));
        
        /**
         * @openapi
        * components:
        *   schemas:
        *     Carro:
        *       type: object
        *       properties:
        *         id:
        *           type: integer
        *           example: 1
        *         nome:
        *           type: string
        *           example: "Corolla"
        *         descricao:
        *           type: string
        *           example: "Sedan confortável e econômico"
        *         tipo:
        *           type: string
        *           example: "Sedan"
        *         ativo:
        *           type: boolean
        *           example: true
        *     CarroInput:
        *       type: object
        *       required:
        *         - nome
        *         - descricao
        *         - tipo
        *         - ativo
        *       properties:
        *         nome:
        *           type: string
        *           example: "Corolla"
        *         descricao:
        *           type: string
        *           example: "Sedan confortável e econômico"
        *         tipo:
        *           type: string
        *           example: "Sedan"
        *         ativo:
        *           type: boolean
        *           example: true
        */

    }
  
    public buscarCarros(req: Request, res: Response) {
        const carros: CarroSchema[] = this.carroRepositorio.getCarros();
        const carrosDto: ViewCarroDTO[] = carros.map(carro => ({
            nome : carro.nome,
            descricao : carro.descricao,
            tipo : carro.tipo,
            ativo : carro.ativo
        } as ViewCarroDTO));
        return res.status(200).json(carrosDto);        
    }

    public buscarCarroPorId(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const id = req.params.id;
        const carro = this.carroRepositorio.getCarroPorId(+id);
        if (carro){
            const carroDto : ViewCarroDTO = {
               nome : carro.nome,
               descricao : carro.descricao,
               tipo : carro.tipo,
               ativo : carro.ativo,
            };
            return res.status(200).json(carroDto);
        }
        return res.status(204).json('Carro não encontrado.');
    }

    public buscarCarroPorTipo(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const tipo = req.params.tipo;
        const carros = this.carroRepositorio.getCarroPorTipo(tipo);

        if (carros.length > 0) {
            // mapeia para DTO
            const carrosDto: ViewCarroDTO[] = carros.map(carro => ({
                nome: carro.nome,
                descricao: carro.descricao,
                tipo: carro.tipo,
                ativo: carro.ativo,
            }));
            return res.status(200).json(carrosDto);
        }

        // 204 não deveria ter corpo → melhor usar 404 com mensagem
        return res.status(404).json({ message: 'Nenhum carro encontrado para este tipo.' });
    }

    public criarCarro(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const dadosCarro : CriarCarroDTO = req.body;
        let carros = this.carroRepositorio.getCarros();
        const idsExistentes = carros.map(carro => carro.id);
        const novoId = Math.max(...idsExistentes)+1;
        const carro = new Carro(
            novoId ?? '0',
            dadosCarro.nome,
            dadosCarro.descricao,
            dadosCarro.tipo,
            dadosCarro.ativo
        );
        this.carroRepositorio.criarCarro(carro);
        carros = this.carroRepositorio.getCarros();
        return res.status(201).json(carros);
    }

    public AtualizarCarroPorId(req: Request, res: Response) {
        const id = req.params.id;
        if (!id){
            return res.status(401).json('Id não enviado');
        }

        const dadosCarro : AtualizarCarroDTO = req.body;
        const carro = this.carroRepositorio.atualizarCarro(+id, dadosCarro);
        if (carro){
            const carroDto : ViewCarroDTO = {
               nome : carro.nome,
               descricao : carro.descricao,
               tipo : carro.tipo,
               ativo : carro.ativo,
               url_foto : carro.url_foto,
               url_video : carro.url_video,
               latitude : carro.latitude,
               longitude : carro.longitude,
               valor : carro.valor,
               vlrFipe : carro.vlrFipe,
               PLACA : carro.PLACA,
            };
            return res.status(200).json(carroDto);
        }
        throw new NotFoundException('Carro não encontrado.');
    }

    public deletarCarroPorId(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            return res.status(401).json('Id não enviado.');
        }

        const sucesso = this.carroRepositorio.deletarCarro(+id);
        if (sucesso) {
            return res.status(204).json('Carro excluido com sucesso.');
        }
        return res.status(204).json('Carro não encontrado');
    }

}

export default CarroController;