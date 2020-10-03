/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PontoManter } from "../../../types/pontoManter";
import { PontoManterAutoComplete } from "../AutoComplete";

interface InputPontoManterProps {
  errorText?: string;
  fullWidth?: boolean;
  onPontosManterSelecionados: (v?: PontoManter[]) => void;
  value?: PontoManter[];
}

const InputPontoManter: React.FC<InputPontoManterProps> = ({
  onPontosManterSelecionados,
  errorText,
  value,
  ...props
}) => {
  const [pontosSelecionados, setPontosSelecionados] = useState<PontoManter[]>(
    []
  );

  const onChangeHandler = (newValue?: PontoManter) => {
    if (newValue) {
      const novosPontos = [...pontosSelecionados, newValue];
      if (onPontosManterSelecionados) onPontosManterSelecionados(novosPontos);
    }
  };

  const onDeleteClickHandler = (index: number) => {
    const novosPontos = [...pontosSelecionados];
    novosPontos.splice(index, 1);
    if (onPontosManterSelecionados) onPontosManterSelecionados(novosPontos);
  };

  useEffect(() => {
    setPontosSelecionados(value || []);
  }, [value]);

  return (
    <>
      <PontoManterAutoComplete
        onPontoManterSelected={onChangeHandler}
        error={!!errorText}
      />
      {errorText && (
        <FormHelperText
          style={{
            color: "red",
          }}
        >
          {errorText}
        </FormHelperText>
      )}
      <List dense>
        {pontosSelecionados.length > 0 &&
          pontosSelecionados.map((p, index) => (
            <ListItem key={`${p.descricao}_${index}`}>
              <ListItemText primary={p.descricao} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    onDeleteClickHandler(index);
                  }}
                >
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
