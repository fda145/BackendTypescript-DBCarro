import CustomErro from './CustomError';

class NotFoundException extends CustomErro {

    constructor(message: string = 'Dado não encontrado'){
        super(message,404);
    }
}

export default NotFoundException;