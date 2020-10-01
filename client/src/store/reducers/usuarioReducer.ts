import { Usuario } from '../../types/usuario';
import { UsuarioActionsTypes } from '../actions/usuario/usuarioActionsTypes';

type UsuarioReducerType = {
  usuarios: Usuario[],
  erroGetUsuarios?: string,
  loadingGetUsuarios: boolean,
  erroSaveUsuario?: string,
  loadingSaveUsuairo: boolean,
}

const INITIAL_STATE:UsuarioReducerType = {
  usuarios: [],
  erroGetUsuarios: undefined,
  loadingGetUsuarios: false,
  erroSaveUsuario: undefined,
  loadingSaveUsuairo: false,
};

export default function UsuarioReducer(
  state = INITIAL_STATE,
  action: UsuarioActionsTypes,
): any {
  switch (action.type) {
    case 'GET_USUARIOS':
      return {
        ...state,
        usuarios: action.usuarios,
        erroGetUsuarios: null,
        loadingGetUsuarios: false,
      };
    case 'GET_USUARIOS_ERROR':
      return {
        ...state,
        usuarios: [],
        erroGetUsuarios: action.error,
        loadingGetUsuarios: false,
      };
    case 'LOADING_GET_USUARIOS':
      return {
        ...state,
        loadingGetUsuarios: action.loading,
      };

    case 'SAVE_USUARIO':
      return {
        ...state,
        usuarios: [...state.usuarios, action.usuario],
        erroSaveUsuario: null,
        loadingSaveUsuairo: false,
      };
    case 'SAVE_USUARIO_ERROR':
      return {
        ...state,
        usuarios: [],
        erroSaveUsuario: action.error,
        loadingSaveUsuairo: false,
      };
    case 'LOADING_SAVE_USUARIO':
      return {
        ...state,
        loadingSaveUsuairo: action.loading,
      };
    default:
      return state;
  }
}
