import { UsuarioActionsTypes } from './usuarioActionsTypes';
import { getAllUsuarios, saveUsuario } from '../../../services/usuarioService';
import { Usuario } from '../../../types/usuario';

const setGetAllUsuarios = (usuarios: Usuario[]): UsuarioActionsTypes => ({ type: 'GET_USUARIOS', usuarios });
const setGetAllUsuarioErro = (error: string): UsuarioActionsTypes => ({ type: 'GET_USUARIOS_ERROR', error });
const setGetAllUsuariosLoading = (loading: boolean): UsuarioActionsTypes => ({ type: 'LOADING_GET_USUARIOS', loading });

const setSaveUsuario = (usuario: Usuario): UsuarioActionsTypes => ({ type: 'SAVE_USUARIO', usuario });
const setSaveUsuarioErro = (error: string): UsuarioActionsTypes => ({ type: 'SAVE_USUARIO_ERROR', error });
const setSaveUsuarioLoading = (loading: boolean): UsuarioActionsTypes => ({ type: 'LOADING_SAVE_USUARIO', loading });

export const getAllUsuariosAction = (): any => async (dispatch: any) => {
  try {
    dispatch(setGetAllUsuariosLoading(true));
    const usuarios = await getAllUsuarios();
    dispatch(setGetAllUsuarios(usuarios));
  } catch (error) {
    console.log(error);
    dispatch(setGetAllUsuarioErro(error.message));
  }
};

export const saveUsuarioAction = (usuario:Usuario): any => async (dispatch: any) => {
  try {
    dispatch(setSaveUsuarioLoading(true));
    const novoUsuario = await saveUsuario(usuario);
    dispatch(setSaveUsuario(novoUsuario));
  } catch (error) {
    console.log(error);
    dispatch(setSaveUsuarioErro(error.message));
  }
};
