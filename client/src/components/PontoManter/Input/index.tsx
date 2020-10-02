/* eslint-disable no-unused-vars */
import {
  Divider,
  FormHelperText,
  Grid,
  IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, SelectProps,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { PontoManter } from '../../../types/pontoManter';
import { PontoManterAutoComplete } from '../AutoComplete';

interface InputPontoManterProps{
  errorText?: string,
  fullWidth?:boolean,
  onPontosManterSelecionados:(v?:PontoManter[])=>void
}

const InputPontoManter: React.FC<InputPontoManterProps> = (
  {
    onPontosManterSelecionados, errorText, ...props
  },
) => {
  const [pontosSelecionados, setPontosSelecionados] = useState<PontoManter[]>([]);

  const onChangeHandler = (value?:PontoManter) => {
    if (value) {
      const novosPontos = [...pontosSelecionados, value];
      setPontosSelecionados(novosPontos);
    }
  };

  const onDeleteClickHandler = (index:number) => {
    const novosPontos = [...pontosSelecionados];
    novosPontos.splice(index, 1);
    setPontosSelecionados(novosPontos);
  };

  useEffect(() => {
    if (onPontosManterSelecionados) onPontosManterSelecionados(pontosSelecionados);
  }, [pontosSelecionados]);

  return (
    <>
      <PontoManterAutoComplete onPontoManterSelected={onChangeHandler} error={!!errorText} />
      {errorText && (
      <FormHelperText style={{
        color: 'red',
      }}
      >
        {errorText}
      </FormHelperText>
      )}
      <List dense>
        {pontosSelecionados.length > 0 && pontosSelecionados.map((p, index) => (
          <ListItem key={`${p.descricao}_${index}`}>
            <ListItemText
              primary={p.descricao}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => { onDeleteClickHandler(index); }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

      </List>

    </>
  );
};

export default InputPontoManter;
