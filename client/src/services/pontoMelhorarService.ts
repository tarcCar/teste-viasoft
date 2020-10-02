import axios from 'axios';
import { PontoMelhorar } from '../types/pontoMelhorar';

export const getAllPontosMelhorar = async ():Promise<PontoMelhorar[]> => {
  try {
    const resposta = await axios.get('/api/pontoMelhorar');
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
