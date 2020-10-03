/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps, createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel } from '@material-ui/core';
import { PontoManter } from '../../../types/pontoManter';
import { getPontosManterAction } from '../../../store/actions/pontoManter/pontoManterActions';
import { RootState } from '../../../store/reducers';

interface PontoManterFilter extends PontoManter{
    inputValue?:string
}
const filter = createFilterOptions<PontoManterFilter>();

interface PontoManterAutoCompleteProps {
  onPontoManterSelected:(v?:PontoManter)=>void
  error?:boolean,
}

export const PontoManterAutoComplete:React.FC<PontoManterAutoCompleteProps> = (
  { onPontoManterSelected, error, ...props },
) => {
  const [value, setValue] = useState<PontoManterFilter | null>(null);

  const pontosManter = useSelector((state:RootState) => state.pontoManterReducer.pontosManter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPontosManterAction());
  }, []);

  useEffect(() => {
    if (onPontoManterSelected) onPontoManterSelected(value as PontoManter);
  }, [value]);

  return (
    <>
      <Autocomplete
        {...props}
        value={value}
        onChange={(event, newValue: any) => {
          if (typeof newValue === 'string') {
            setValue({
              descricao: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setValue({
              descricao: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options as PontoManterFilter[], params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              descricao: `${params.inputValue}`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={pontosManter}
        getOptionLabel={(option:any) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.descricao;
        }}
        renderOption={(option:any) => option.descricao}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Pontos a manter" placeholder="Digite para procurar ou adicionar um ponto a manter" fullWidth error={error} variant="outlined" />
        )}
      />
    </>
  );
};
