import { Usuario } from '../../types/usuario';
import { UsuarioActionsTypes } from '../actions/usuario/usuarioActionsTypes';

type UsuarioReducerType = {
  usuarios: Usuario[],
  usuarioSalvo?: Usuario,
  erroGetUsuarios?: string,
  loadingGetUsuarios: boolean,
  erroSaveUsuario?: string,
  loadingSaveUsuario: boolean,
}

const INITIAL_STATE:UsuarioReducerType = {
  usuarios: [],
  usuarioSalvo: undefined,
  erroGetUsuarios: undefined,
  loadingGetUsuarios: false,
  erroSaveUsuario: undefined,
  loadingSaveUsuario: false,
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
        usuarioSalvo: action.usuario,
        usuarios: [...state.usuarios, action.usuario],
        erroSaveUsuario: null,
        loadingSaveUsuario: false,
      };
    case 'SAVE_USUARIO_ERROR':
      return {
        ...state,
        usuarios: [],
        erroSaveUsuario: action.error,
        loadingSaveUsuario: false,
      };
    case 'LOADING_SAVE_USUARIO':
      return {
        ...state,
        loadingSaveUsuario: action.loading,
      };
    default:
      return state;
  }
}
