import axios from 'axios';
import { Usuario } from '../types/usuario';

export const getAllUsuarios = async ():Promise<Usuario[]> => {
  try {
    const resposta = await axios.get('/api/usuario');
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

export const saveUsuario = async (usuario:Usuario):Promise<Usuario> => {
  try {
    const resposta = await axios.post('/api/usuario', usuario);
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
