import { body, param } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
  requestParam,
} from "inversify-express-utils";

import { authMiddleware } from "@middlewares/authMiddleware";
import { Feedback } from "@models/feedback";
import { FeedbackService } from "@services/feedbackService";
import { Controller } from "@type/Controller";

const postFeedbackValidator = [
  body("feedBackFinal").notEmpty().withMessage("Feedback final é obrigatório"),
  body("usuarioDestino").notEmpty().withMessage("Usuário é obrigatório"),
  body("*.pontosManter")
    .optional()
    .isArray()
    .withMessage("Pontos para manter precisa ser um array"),
  body("*.pontosManter.descricao")
    .notEmpty()
    .withMessage("Descrição dos Pontos para manter é obrigatório"),
  body("*.pontosMelhorar")
    .optional()
    .isArray()
    .withMessage("Pontos para melhorar precisa ser um array"),
  body("*.pontosMelhorar.descricao")
    .notEmpty()
    .withMessage("Descrição dos Pontos para melhorar é obrigatório"),
];

const getByIdFeedbackValidator = [
  param("id").notEmpty().withMessage("Id é obrigatório"),
];

@controller("/api/feedback", authMiddleware())
export class FeedbackController extends Controller {
  public constructor(private readonly feedBackService: FeedbackService) {
    super();
  }

  /**
   * @swagger
   * /api/feedback:
   *   get:
   *     tags:
   *       - Feedback
   *     description: Lista todos feedbacks que envolveousuário logado
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um array de feedbacks
   *          schema:
   *                $ref: '#/definitions/Feedback'
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpGet("/")
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      const idUsuarioLogado = this.httpContext.user.details.id;
      return this.ok(await this.feedBackService.listar(idUsuarioLogado));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/feedback/{id}:
   *   get:
   *     tags:
   *       - PontoMelhorar
   *     description: Busca o feedback com todos os campos
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id do feedback
   *         in: path
   *         required: true
   *         schema:
   *             type: numeric
   *     responses:
   *       200:
   *         description: Feedback
   *         schema:
   *           $ref: '#/definitions/Feedback'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpGet("/:id", ...getByIdFeedbackValidator)
  public async getById(
    @requestParam() id: string
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.feedBackService.buscarPorId(id));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/feedback:
   *   post:
   *     tags:
   *       - PontoMelhorar
   *     description: Salva um novo Feedback
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Feedback
   *         description: Feedback
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/Feedback'
   *     responses:
   *       200:
   *         description: Novo Feedback
   *         schema:
   *           $ref: '#/definitions/Feedback'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpPost("/", ...postFeedbackValidator)
  public async post(
    @requestBody() feedback: Feedback
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.feedBackService.salvar(feedback));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
