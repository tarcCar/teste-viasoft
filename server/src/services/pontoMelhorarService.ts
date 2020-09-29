import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { PontoMelhorar } from "@models/pontoMelhorar";

@injectable()
export class PontoMelhorarService {
  public constructor(
    @inject(TYPE_DI.PontoMelhorarRepository)
    private readonly pontoMelhorarRepository: Repository<PontoMelhorar>
  ) {}

  public async salvar(pontoMelhorar: PontoMelhorar): Promise<PontoMelhorar> {
    return this.pontoMelhorarRepository.save(
      this.pontoMelhorarRepository.create(pontoMelhorar)
    );
  }

  public async listar(): Promise<PontoMelhorar[]> {
    return this.pontoMelhorarRepository.find({
      select: ["id", "descricao", "alteradoEm", "criadoEm"],
    });
  }
}
