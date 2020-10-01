import {
  FormHelperText,
  InputLabel, MenuItem, Select, SelectProps,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuariosAction } from '../../../store/actions/usuario/usuarioActions';
import { RootState } from '../../../store/reducers';

// import { Container } from './styles';

interface SelectUsuarioProps extends SelectProps{
    label:string
    helperText?:string
}

const SelectUsuario: React.FC<SelectUsuarioProps> = ({
  label, helperText, value, ...props
}) => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state:RootState) => state.usuarioReducer.usuarios);

  useEffect(() => {
    if (!usuarios || usuarios.length <= 0) {
      dispatch(getAllUsuariosAction());
    }
  }, []);

  return (
    <>
      <InputLabel id="usuario-select-label">{label}</InputLabel>
      <Select
        labelId="usuario-select-label"
        id="usuario-select"
        {...props}
        disabled={!usuarios || usuarios.length <= 0}
        renderValue={(valueSelected:any) => {
          if (valueSelected) {
            return valueSelected.nome;
          }
          return 'Selecione um usuário';
        }}
      >
        {
        usuarios.map((u:any) => (
          <MenuItem key={u.id} value={u}>{u.nome}</MenuItem>
        ))
    }
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
};

export default SelectUsuario;
