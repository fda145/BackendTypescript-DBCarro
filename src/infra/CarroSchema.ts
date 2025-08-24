export type CarroSchema = {
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
//  RENAVAN?: {[Key: number]: unknown};
//  PLACA?: {[Key: string]: unknown};
};
