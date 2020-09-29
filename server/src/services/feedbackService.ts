import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Feedback } from "@models/feedback";

@injectable()
export class FeedbackService {
  public constructor(
    @inject(TYPE_DI.FeedbackRepository)
    private readonly feedbackRepository: Repository<Feedback>
  ) {}

  public async salvar(feedback: Feedback): Promise<Feedback> {
    return this.feedbackRepository.save(
      this.feedbackRepository.create(feedback)
    );
  }

  public async listar(idUsuario: string): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      relations: ["usuarioOrigem", "usuarioDestino"],
      where: [
        {
          usuarioOrigem: idUsuario,
        },
        {
          usuarioDestino: idUsuario,
        },
      ],
    });
  }

  public async buscarPorId(id: string): Promise<Feedback> {
    return this.feedbackRepository.findOne({
      relations: [
        "usuarioOrigem",
        "usuarioDestino",
        "pontosManter",
        "pontosMelhorar",
      ],
      where: {
        id,
      },
    });
  }
}
