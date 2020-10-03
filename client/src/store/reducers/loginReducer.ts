import { LoginActionsTypes } from '../actions/login/loginActionsTypes';

const INITIAL_STATE = {
  login: null,
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
        login: action.login,
        erroLogin: null,
        loadingLogin: false,
      };
    case 'LOGIN_ERRO':
      return {
        ...state,
        login: null,
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
