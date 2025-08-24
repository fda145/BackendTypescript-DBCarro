import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { buffer } from 'stream/consumers';

const USUARIO = 'master';
const SENHA = 'master%123';

export const basicAutMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // pega o header authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // se não ha header de autorização, solicita credenciais
        res.status(401)
        .set('WWW-Authenticate','Basic realm="Protected Route"')
        .json({
            error: 'Acesso negado',
            message: 'Credenciais de autenticação são necessárias'
        });
    }
    // Verifica se o header  começa com "Basic"
    if (!authHeader?.startsWith('Basic')) {
        res.status(401).json({
            error: 'Formato de autenticação inválida',
            message: 'Use Basic Auth'
        });
        return;
    }

    try {
        // Extrai e decodifica  as credenciais
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials,'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        // Valida as credenciais
        if (username=== USUARIO && password === SENHA) {
            // Adiciona informações do usuário ao request para uso posterior
            (req as Request & {user : {username: string}}).user = {username};
            next();
        } else {
            res.status(401)
            .set('www-Authenticate','Basic realm="Protected Route"')
            .json({
                error: 'Credenciais inválidas',
                message: 'Nome de usuário ou senha incorretas'
            });
        }

    } catch {
        // Erro na decodificação das credenciais
        res.status(400).json({
                error: 'Formato de credenciais inválidas',
                message: 'Não foi possível decodificar as credenciais'
        });

    }
};

