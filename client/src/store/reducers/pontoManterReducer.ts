import { PontoManter } from '../../types/pontoManter';
import { PontoMAnterActionsTypes } from '../actions/pontoManter/pontoManterActionsTypes';

type PontoManterReducerType = {
  pontosManter: PontoManter[],
  erroGetPontoManters?: string,
  loadingGetPontoManters: boolean,
}

const INITIAL_STATE:PontoManterReducerType = {
  pontosManter: [],
  erroGetPontoManters: undefined,
  loadingGetPontoManters: false,
};

export default function PontoManterReducer(
  state = INITIAL_STATE,
  action: PontoMAnterActionsTypes,
): any {
  switch (action.type) {
    case 'GET_PONTOS_MANTER':
      return {
        ...state,
        pontosManter: action.pontosManter,
        erroGetPontoManters: null,
        loadingGetPontoManters: false,
      };
    case 'GET_PONTOS_MANTER_ERROR':
      return {
        ...state,
        pontosManter: [],
        erroGetPontoManters: action.error,
        loadingGetPontoManters: false,
      };
    case 'LOADING_GET_PONTOS_MANTER':
      return {
        ...state,
        loadingGetPontoManters: action.loading,
      };
    default:
      return state;
  }
}
