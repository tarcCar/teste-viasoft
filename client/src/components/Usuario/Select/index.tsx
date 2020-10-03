import {
  FormHelperText,
  InputLabel, MenuItem, Select, SelectProps,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuariosAction } from '../../../store/actions/usuario/usuarioActions';
import { RootState } from '../../../store/reducers';
import { Usuario } from '../../../types/usuario';

// import { Container } from './styles';

interface SelectUsuarioProps extends SelectProps{
    label:string
    errorText?:string,
    value?:Usuario
}

const SelectUsuario: React.FC<SelectUsuarioProps> = ({
  label, errorText, value, onSelect, ...props
}) => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state:RootState) => state.usuarioReducer.usuarios);
  const [selectedOption, setSelectedOption] = useState<Usuario | undefined>(undefined);

  useEffect(() => {
    if (!usuarios || usuarios.length <= 0) {
      dispatch(getAllUsuariosAction());
    }
  }, []);

  const onChangeHandler = (event:any) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    if (onSelect) onSelect(event);
  };
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <>
      <InputLabel id="usuario-select-label">{label}</InputLabel>
      <Select
        labelId="usuario-select-label"
        id="usuario-select"
        {...props}
        disabled={!usuarios || usuarios.length <= 0}
        value={selectedOption || ''}
        onChange={onChangeHandler}
        displayEmpty
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
      {errorText && <FormHelperText style={{ color: 'red' }}>{errorText}</FormHelperText>}
    </>
  );
};

export default SelectUsuario;
