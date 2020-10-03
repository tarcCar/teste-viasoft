/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "@material-ui/core";
import { PontoMelhorar } from "../../../types/pontoMelhorar";
import { getPontosMelhorarAction } from "../../../store/actions/pontoMelhorar/pontoMelhorarActions";
import { RootState } from "../../../store/reducers";

interface PontoMelhorarFilter extends PontoMelhorar {
  inputValue?: string;
}
const filter = createFilterOptions<PontoMelhorarFilter>();

interface PontoMelhorarAutoCompleteProps {
  onPontoMelhorarSelected: (v?: PontoMelhorar) => void;
  error?: boolean;
}

export const PontoMelhorarAutoComplete: React.FC<PontoMelhorarAutoCompleteProps> = ({
  onPontoMelhorarSelected,
  error,
  ...props
}) => {
  const [value, setValue] = useState<PontoMelhorarFilter | null>(null);

  const pontosMelhorar = useSelector(
    (state: RootState) => state.pontoMelhorarReducer.pontosMelhorar
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPontosMelhorarAction());
  }, []);

  useEffect(() => {
    if (onPontoMelhorarSelected)
      onPontoMelhorarSelected(value as PontoMelhorar);
  }, [value]);

  return (
    <>
      <Autocomplete
        {...props}
        value={value}
        onChange={(event, newValue: any) => {
          if (typeof newValue === "string") {
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
          const filtered = filter(options as PontoMelhorarFilter[], params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
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
        options={pontosMelhorar}
        getOptionLabel={(option: any) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.descricao;
        }}
        renderOption={(option: any) => option.descricao}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pontos a melhorar"
            placeholder="Digite para procurar ou adicionar um ponto a melhorar"
            fullWidth
            error={error}
            variant="outlined"
          />
        )}
      />
    </>
  );
};
