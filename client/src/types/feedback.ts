import { PontoManter } from './pontoManter';
import { PontoMelhorar } from './pontoMelhorar';
import { Usuario } from './usuario';

export type Feedback = {
    id?: string;
    sugestoes?: string;
    feedBackFinal?: string;
    usuarioOrigem?: Usuario;
    usuarioDestino?: Usuario;
    pontosManter?: PontoManter[];
    pontosMelhorar?: PontoMelhorar[];
    criadoEm?: Date;
    alteradoEm?: Date;
}
