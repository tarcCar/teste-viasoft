import { Usuario } from '../../../types/usuario';

type GET_USUARIOS = {
    type: 'GET_USUARIOS';
    usuarios: Usuario[];
  };

type GET_USUARIOS_ERROR = {
    type: 'GET_USUARIOS_ERROR';
    error: string;
  };

type LOADING_GET_USUARIOS= {
    type: 'LOADING_GET_USUARIOS';
    loading: boolean;
  };

type SAVE_USUARIO = {
    type: 'SAVE_USUARIO';
    usuario: Usuario;
  };

type SAVE_USUARIO_ERROR = {
    type: 'SAVE_USUARIO_ERROR';
    error: string;
  };

type LOADING_SAVE_USUARIO= {
    type: 'LOADING_SAVE_USUARIO';
    loading: boolean;
  };

export type UsuarioActionsTypes =
    | GET_USUARIOS
    | GET_USUARIOS_ERROR
    | LOADING_GET_USUARIOS
    | SAVE_USUARIO
    | SAVE_USUARIO_ERROR
    | LOADING_SAVE_USUARIO
