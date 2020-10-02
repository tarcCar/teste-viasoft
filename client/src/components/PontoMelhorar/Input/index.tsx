/* eslint-disable no-unused-vars */
import {
  FormHelperText,
  IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { PontoMelhorar } from '../../../types/pontoMelhorar';
import { PontoMelhorarAutoComplete } from '../AutoComplete';

interface InputPontoMelhorarProps{
  errorText?: string,
  fullWidth?:boolean,
  onPontosMelhorarSelecionados:(v?:PontoMelhorar[])=>void
}

const InputPontoMelhorar: React.FC<InputPontoMelhorarProps> = (
  {
    onPontosMelhorarSelecionados, errorText, ...props
  },
) => {
  const [pontosSelecionados, setPontosSelecionados] = useState<PontoMelhorar[]>([]);

  const onChangeHandler = (value?:PontoMelhorar) => {
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
    if (onPontosMelhorarSelecionados) onPontosMelhorarSelecionados(pontosSelecionados);
  }, [pontosSelecionados]);

  return (
    <>
      <PontoMelhorarAutoComplete onPontoMelhorarSelected={onChangeHandler} error={!!errorText} />
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

export default InputPontoMelhorar;
