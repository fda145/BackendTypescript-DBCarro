import path from 'path';
import fs from 'fs';
import { DBSchema } from './DBSchema';
import { CarroSchema } from './CarroSchema';
import { Carro } from '../Carros';

export default class CarroRepositorio {
    private caminhoArquivo : string;

    constructor (caminho: string = 'fakeDB.json') {
        this.caminhoArquivo = path.join(__dirname, caminho);
    }

    private acessoDB(): DBSchema {
        const dbPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
        return JSON.parse(dbPuro);
    };

    private reEscreverDB(dbAtualizar: DBSchema): boolean {
        try {
            fs.writeFileSync(this.caminhoArquivo, JSON.stringify(dbAtualizar));
            return true;
        } catch {
            return false;
        }
    };

    public getCarros() : CarroSchema[] {
      const db = this.acessoDB();
      const carros = db.carros;
      return carros;
    }

    public getCarroPorId(id: number): CarroSchema | undefined {
        const carros = this.getCarros();
        return carros.find(carro => carro.id === id);
    }

    public getCarroPorTipo(tipo: string): CarroSchema[] {
        const carros = this.getCarros();
        return carros.filter(carro => carro.tipo === tipo);
    }

    public criarCarro(carro: Carro): CarroSchema[] {
        const carros = this.getCarros();
        carros.push (
            {...carro }
        
        );
        const dbAtualizado = this.acessoDB();
        dbAtualizado.carros = carros;
        this.reEscreverDB(dbAtualizado);
        return carros;
    }

    public deletarCarro(id: number) : boolean {
        const carros = this.getCarros();
        const indiceCarro = carros.findIndex(carro => carro.id === id);
        
        if (indiceCarro === -1) {
            return false; // Usuário não encontrado
        }

        carros.splice(indiceCarro, 1);
        const dbAtualizado = this.acessoDB();
        dbAtualizado.carros = carros;

        return this.reEscreverDB(dbAtualizado);
    }

    public atualizarCarro(id: number, dadosAtualizados: Partial<Carro>): CarroSchema | undefined {
        const carros = this.getCarros();
        const indiceCarro = carros.findIndex(carro => carro.id === id);

        if (indiceCarro === -1) {
            return undefined; // Usuário não encontrado
        }
        // Atualiza apenas os campos fornecidos, mantendo os existentes
        carros[indiceCarro] = {
            ...carros[indiceCarro],
            ...dadosAtualizados,
            id // Garante que o ID não seja alterado
        };
        const dbAtualizado = this.acessoDB();
        dbAtualizado.carros = carros;

        const sucesso = this.reEscreverDB(dbAtualizado);
        return sucesso ? carros[indiceCarro] : undefined;
    }
}