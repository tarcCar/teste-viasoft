import { body } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";

import { authMiddleware } from "@middlewares/authMiddleware";
import { PontoManter } from "@models/pontoManter";
import { PontoManterService } from "@services/pontoManterService";
import { Controller } from "@type/Controller";

const postPontoManterValidator = [
  body("descricao").notEmpty().withMessage("Descrição é obrigatório"),
];

@controller("/api/pontoManter", authMiddleware())
export class PontoManterController extends Controller {
  public constructor(private readonly pontoManterService: PontoManterService) {
    super();
  }

  /**
   * @swagger
   * /api/pontoManter:
   *   get:
   *     tags:
   *       - PontoManter
   *     description: Lista todos os pontos a manter
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um array de pontos a manter
   *          schema:
   *                $ref: '#/definitions/PontoManter'
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpGet("/")
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.pontoManterService.listar());
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/pontoManter:
   *   post:
   *     tags:
   *       - PontoManter
   *     description: Salva um novo ponto a manter
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: ponto a manter
   *         description: Ponto a manter
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/PontoManter'
   *     responses:
   *       200:
   *         description: Novo Ponto a Manter
   *         schema:
   *           $ref: '#/definitions/PontoManter'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */

  @httpPost("/", ...postPontoManterValidator)
  public async post(
    @requestBody() pontoManter: PontoManter
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.pontoManterService.salvar(pontoManter));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
