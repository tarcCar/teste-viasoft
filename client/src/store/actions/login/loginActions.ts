import { LoginActionsTypes } from './loginActionsTypes';
import loginService from '../../../services/loginService';
import { Login } from '../../../types/login';

const setLoginSucesso = (login: Login): LoginActionsTypes => ({ type: 'LOGIN_SUCESSO', login });
const setLoginErro = (error: string): LoginActionsTypes => ({ type: 'LOGIN_ERRO', error });
const setLoginLoading = (loading: boolean): LoginActionsTypes => ({ type: 'LOADING_lOGIN', loading });

const loginAction = (
  login: string,
  senha: string,
): any => async (dispatch: any) => {
  try {
    dispatch(setLoginLoading(true));
    const loginSucesso = await loginService(login, senha);
    localStorage.setItem('token', loginSucesso.token);
    return dispatch(setLoginSucesso(loginSucesso));
  } catch (error) {
    return dispatch(setLoginErro(error.message));
  }
};

export default loginAction;
