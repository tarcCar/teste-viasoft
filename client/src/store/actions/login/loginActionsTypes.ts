import { Login } from '../../../types/login';

type LOGIN_SUCESSO = {
    type: 'LOGIN_SUCESSO';
    login: Login;
  };
type LOGIN_ERRO = {
    type: 'LOGIN_ERRO';
    error: string;
  };
type LOADING_lOGIN= {
    type: 'LOADING_lOGIN';
    loading: boolean;
  };

export type LoginActionsTypes =
    | LOGIN_SUCESSO
    | LOGIN_ERRO
    | LOADING_lOGIN;
