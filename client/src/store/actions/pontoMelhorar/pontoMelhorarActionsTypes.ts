import { PontoMelhorar } from "../../../types/pontoMelhorar";

type GET_PONTOS_MELHORAR = {
  type: "GET_PONTOS_MELHORAR";
  pontosMelhorar: PontoMelhorar[];
};

type GET_PONTOS_MELHORAR_ERROR = {
  type: "GET_PONTOS_MELHORAR_ERROR";
  error: string;
};

type LOADING_GET_PONTOS_MELHORAR = {
  type: "LOADING_GET_PONTOS_MELHORAR";
  loading: boolean;
};

export type PontoMelhorarActionsTypes =
  | GET_PONTOS_MELHORAR
  | GET_PONTOS_MELHORAR_ERROR
  | LOADING_GET_PONTOS_MELHORAR;
