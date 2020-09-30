import axios from 'axios';
import { Login } from '../types/login';

const loginSevice = async (login:string, senha:string):Promise<Login> => {
  try {
    const resposta = await axios.post('/api/login', { login, senha });
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

export default loginSevice;
