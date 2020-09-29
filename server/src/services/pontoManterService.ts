import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { PontoManter } from "@models/pontoManter";

@injectable()
export class PontoManterService {
  public constructor(
    @inject(TYPE_DI.PontoManterRepository)
    private readonly pontoManterRepository: Repository<PontoManter>
  ) {}

  public async salvar(pontoManter: PontoManter): Promise<PontoManter> {
    return this.pontoManterRepository.save(
      this.pontoManterRepository.create(pontoManter)
    );
  }

  public async listar(): Promise<PontoManter[]> {
    return this.pontoManterRepository.find({
      select: ["id", "descricao", "alteradoEm", "criadoEm"],
    });
  }
}
