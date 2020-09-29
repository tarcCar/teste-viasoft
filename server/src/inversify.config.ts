/* eslint-disable global-require */
import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";

import { getDbConnection } from "@config/db";
import { Usuario } from "@models/usuario";
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
  // Services
  bind<UsuarioService>(UsuarioService).toSelf();
});
