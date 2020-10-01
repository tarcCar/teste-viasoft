import { PontoMAnterActionsTypes } from './pontoManterActionsTypes';
import { getAllPontosManter } from '../../../services/pontoManterService';
import { PontoManter } from '../../../types/pontoManter';

const setGetPontosManter = (pontosManter: PontoManter[]): PontoMAnterActionsTypes => ({ type: 'GET_PONTOS_MANTER', pontosManter });
const setGetPontosManterErro = (error: string): PontoMAnterActionsTypes => ({ type: 'GET_PONTOS_MANTER_ERROR', error });
const setGetPontosManterLoading = (loading: boolean): PontoMAnterActionsTypes => ({ type: 'LOADING_GET_PONTOS_MANTER', loading });

export const getPontosManterAction = (): any => async (dispatch: any) => {
  try {
    dispatch(setGetPontosManterLoading(true));
    const pontosManter = await getAllPontosManter();
    dispatch(setGetPontosManter(pontosManter));
  } catch (error) {
    console.log(error);
    dispatch(setGetPontosManterErro(error.message));
  }
};
