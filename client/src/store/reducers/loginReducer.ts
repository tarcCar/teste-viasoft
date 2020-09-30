import { LoginActionsTypes } from '../actions/login/loginActionsTypes';

const INITIAL_STATE = {
  loginSucesso: null,
  erroLogin: null,
  loadingLogin: false,
};

export default function LoginReducer(
  state = INITIAL_STATE,
  action: LoginActionsTypes,
): any {
  switch (action.type) {
    case 'LOGIN_SUCESSO':
      return {
        ...state,
        loginSucesso: action.login,
        erroLogin: null,
        loadingLogin: false,
      };
    case 'LOGIN_ERRO':
      return {
        ...state,
        loginSucesso: null,
        erroLogin: action.error,
        loadingLogin: false,
      };
    case 'LOADING_lOGIN':
      return {
        ...state,
        loadingLogin: action.loading,
      };
    default:
      return state;
  }
}
