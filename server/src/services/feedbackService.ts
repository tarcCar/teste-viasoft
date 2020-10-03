import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Feedback } from "@models/feedback";

type FeedBacks = {
  feedbacksDoUsuario: Feedback[];
  feedbacksParaUsuario: Feedback[];
};

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

  public async listar(idUsuario: number): Promise<FeedBacks> {
    const feedbacks = await this.feedbackRepository.find({
      relations: [
        "usuarioOrigem",
        "usuarioDestino",
        "pontosManter",
        "pontosMelhorar",
      ],
      where: [
        {
          usuarioOrigem: idUsuario,
        },
        {
          usuarioDestino: idUsuario,
        },
      ],
    });
    return {
      feedbacksDoUsuario: feedbacks.filter(
        (f) => f.usuarioOrigem.id === idUsuario
      ),
      feedbacksParaUsuario: feedbacks.filter(
        (f) => f.usuarioDestino.id === idUsuario
      ),
    };
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
