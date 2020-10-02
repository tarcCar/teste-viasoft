import { PontoMelhorar } from '../../types/pontoMelhorar';
import { PontoMelhorarActionsTypes } from '../actions/pontoMelhorar/pontoMelhorarActionsTypes';

type PontoMelhorarReducerType = {
  pontosMelhorar: PontoMelhorar[],
  erroGetPontoMelhorars?: string,
  loadingGetPontoMelhorars: boolean,
}

const INITIAL_STATE:PontoMelhorarReducerType = {
  pontosMelhorar: [],
  erroGetPontoMelhorars: undefined,
  loadingGetPontoMelhorars: false,
};

export default function PontoMelhorarReducer(
  state = INITIAL_STATE,
  action: PontoMelhorarActionsTypes,
): any {
  switch (action.type) {
    case 'GET_PONTOS_MELHORAR':
      return {
        ...state,
        pontosMelhorar: action.pontosMelhorar,
        erroGetPontoMelhorars: null,
        loadingGetPontoMelhorars: false,
      };
    case 'GET_PONTOS_MELHORAR_ERROR':
      return {
        ...state,
        pontosMelhorar: [],
        erroGetPontoMelhorars: action.error,
        loadingGetPontoMelhorars: false,
      };
    case 'LOADING_GET_PONTOS_MELHORAR':
      return {
        ...state,
        loadingGetPontoMelhorars: action.loading,
      };
    default:
      return state;
  }
}
