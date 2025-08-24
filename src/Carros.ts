export class Carro {
  id: number;
  nome: string;
  descricao: string;
  tipo : string;
  ativo: boolean;
  url_foto? : string;
  url_video? : string;
  latitude? : string;
  longitude? : string;
  valor?: bigint;
  vlrFipe?: bigint;
  RENAVAN?: number;
  PLACA?: string;

  constructor(id: number, nome: string, descricao: string, tipo: string, ativo: boolean) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.tipo = tipo;
    this.ativo = ativo;
  }
}

export type CriarCarroDTO = Omit<Carro, 'id'>;

export type AtualizarCarroDTO = Partial<CriarCarroDTO>;

export type ViewCarroDTO = Omit<CriarCarroDTO,'RENAVAN'>