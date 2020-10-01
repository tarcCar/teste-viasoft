import axios from 'axios';
import { PontoManter } from '../types/pontoManter';

export const getAllPontosManter = async ():Promise<PontoManter[]> => {
  try {
    const resposta = await axios.get('/api/pontoManter');
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
