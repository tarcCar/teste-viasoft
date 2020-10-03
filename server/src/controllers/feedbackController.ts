import { body, param } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
  requestParam,
  httpPut,
} from "inversify-express-utils";

import { authMiddleware } from "@middlewares/authMiddleware";
import { Feedback } from "@models/feedback";
import { FeedbackService } from "@services/feedbackService";
import { UsuarioService } from "@services/usuarioService";
import { Controller } from "@type/Controller";

const postFeedbackValidator = [
  body("feedBackFinal").notEmpty().withMessage("Feedback final é obrigatório"),
  body("usuarioDestino").notEmpty().withMessage("Usuário é obrigatório"),
  body("pontosManter")
    .optional()
    .isArray()
    .withMessage("Pontos para manter precisa ser um array"),
  body("pontosManter.*.descricao")
    .notEmpty()
    .withMessage("Descrição dos Pontos para manter é obrigatório"),
  body("pontosMelhorar")
    .optional()
    .isArray()
    .withMessage("Pontos para melhorar precisa ser um array"),
  body("pontosMelhorar.*.descricao")
    .notEmpty()
    .withMessage("Descrição dos Pontos para melhorar é obrigatório"),
];

const getByIdFeedbackValidator = [
  param("id").notEmpty().withMessage("Id é obrigatório"),
];

@controller("/api/feedback", authMiddleware())
export class FeedbackController extends Controller {
  public constructor(
    private readonly feedBackService: FeedbackService,
    private readonly usuarioService: UsuarioService
  ) {
    super();
  }

  /**
   * @swagger
   * /api/feedback:
   *   get:
   *     tags:
   *       - Feedback
   *     description: Lista todos feedbacks que envolveo usuário logado, separando os feedback que o usuario criou e os feedback que foram feitos para o usuario
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um Objecto com duas propriedades que sepram os feedbacks do usuario e para o usuario
   *          schema:
   *                type: object
   *                properties:
   *                  feedbacksDoUsuario:
   *                    type: array
   *                    items:
   *                      $ref: '#/definitions/Feedback'
   *                  feedbacksParaUsuario:
   *                    type: array
   *                    items:
   *                      $ref: '#/definitions/Feedback'
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpGet("/")
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      const idUsuarioLogado = this.httpContext.user.details.id;
      return this.ok(
        await this.feedBackService.listar(Number(idUsuarioLogado))
      );
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/feedback/{id}:
   *   put:
   *     tags:
   *       - Feedback
   *     description: Atualiza o feedback
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id do feedback
   *         in: path
   *         required: true
   *         schema:
   *             type: numeric
   *       - name: Feedback
   *         description: Feedback
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/Feedback'
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
  @httpPut("/:id", ...getByIdFeedbackValidator, ...postFeedbackValidator)
  public async put(
    @requestParam("id") id: string,
    @requestBody() feedback: Feedback
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      const usuario = await this.usuarioService.buscarPorId(
        this.httpContext.user.details.id
      );
      if (!usuario) {
        return this.badRequest("Usuário Origem não foi encontrado");
      }
      feedback.id = id;
      feedback.usuarioOrigem = usuario;
      return this.ok(await this.feedBackService.salvar(feedback));
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
   *       - Feedback
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
      const usuario = await this.usuarioService.buscarPorId(
        this.httpContext.user.details.id
      );
      if (!usuario) {
        return this.badRequest("Usuário Origem não foi encontrado");
      }
      feedback.usuarioOrigem = usuario;
      return this.ok(await this.feedBackService.salvar(feedback));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
