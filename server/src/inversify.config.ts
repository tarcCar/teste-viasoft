/* eslint-disable global-require */
import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";

import { getDbConnection } from "@config/db";
import { Feedback } from "@models/feedback";
import { PontoManter } from "@models/pontoManter";
import { PontoMelhorar } from "@models/pontoMelhorar";
import { Usuario } from "@models/usuario";
import { FeedbackService } from "@services/feedbackService";
import { PontoManterService } from "@services/pontoManterService";
import { PontoMelhorarService } from "@services/pontoMelhorarService";
import { UsuarioService } from "@services/usuarioService";

import { TYPE_DI } from "./constants/typesInjecaoDependencia";
import getRepository from "./repositories/getRepository";

export const bindings = new AsyncContainerModule(async (bind) => {
  await getDbConnection();
  // Carrega todos os controller para as rotas ficarem disponiveis
  await require("@controllers/index");

  // Repositorios

  bind<Repository<Usuario>>(TYPE_DI.UsuarioRepository)
    .toDynamicValue(() => {
      return getRepository<Usuario>(Usuario);
    })
    .inRequestScope();

  bind<Repository<PontoManter>>(TYPE_DI.PontoManterRepository)
    .toDynamicValue(() => {
      return getRepository<PontoManter>(PontoManter);
    })
    .inRequestScope();

  bind<Repository<PontoMelhorar>>(TYPE_DI.PontoMelhorarRepository)
    .toDynamicValue(() => {
      return getRepository<PontoMelhorar>(PontoMelhorar);
    })
    .inRequestScope();
  bind<Repository<Feedback>>(TYPE_DI.FeedbackRepository)
    .toDynamicValue(() => {
      return getRepository<Feedback>(Feedback);
    })
    .inRequestScope();
  // Services
  bind<UsuarioService>(UsuarioService).toSelf();
  bind<PontoManterService>(PontoManterService).toSelf();
  bind<PontoMelhorarService>(PontoMelhorarService).toSelf();
  bind<FeedbackService>(FeedbackService).toSelf();
});
