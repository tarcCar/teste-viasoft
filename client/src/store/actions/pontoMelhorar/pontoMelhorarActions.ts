import { PontoMelhorarActionsTypes } from './pontoMelhorarActionsTypes';
import { getAllPontosMelhorar } from '../../../services/pontoMelhorarService';
import { PontoMelhorar } from '../../../types/pontoMelhorar';

const setGetPontosMelhorar = (pontosMelhorar: PontoMelhorar[]): PontoMelhorarActionsTypes => ({ type: 'GET_PONTOS_MELHORAR', pontosMelhorar });
const setGetPontosMelhorarErro = (error: string): PontoMelhorarActionsTypes => ({ type: 'GET_PONTOS_MELHORAR_ERROR', error });
const setGetPontosMelhorarLoading = (loading: boolean): PontoMelhorarActionsTypes => ({ type: 'LOADING_GET_PONTOS_MELHORAR', loading });

export const getPontosMelhorarAction = (): any => async (dispatch: any) => {
  try {
    dispatch(setGetPontosMelhorarLoading(true));
    const pontosMelhorar = await getAllPontosMelhorar();
    dispatch(setGetPontosMelhorar(pontosMelhorar));
  } catch (error) {
    console.log(error);
    dispatch(setGetPontosMelhorarErro(error.message));
  }
};
