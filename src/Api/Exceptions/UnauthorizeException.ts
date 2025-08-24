import CustomErro from './CustomError';

class UnauthorizeException extends CustomErro {
    constructor (message: string = 'Acesso não autorizado') {
        super(message, 401);
    }
} 

export default UnauthorizeException;