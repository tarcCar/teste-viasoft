import { PontoManter } from "../../../types/pontoManter";

type GET_PONTOS_MANTER = {
  type: "GET_PONTOS_MANTER";
  pontosManter: PontoManter[];
};

type GET_PONTOS_MANTER_ERROR = {
  type: "GET_PONTOS_MANTER_ERROR";
  error: string;
};

type LOADING_GET_PONTOS_MANTER = {
  type: "LOADING_GET_PONTOS_MANTER";
  loading: boolean;
};

export type PontoMAnterActionsTypes =
  | GET_PONTOS_MANTER
  | GET_PONTOS_MANTER_ERROR
  | LOADING_GET_PONTOS_MANTER;
