import { body } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";

import { authMiddleware } from "@middlewares/authMiddleware";
import { PontoMelhorar } from "@models/pontoMelhorar";
import { PontoMelhorarService } from "@services/pontoMelhorarService";
import { Controller } from "@type/Controller";

const postPontoMelhorarValidator = [
  body("descricao").notEmpty().withMessage("Descrição é obrigatório"),
];

@controller("/api/pontoMelhorar", authMiddleware())
export class PontoMelhorarController extends Controller {
  public constructor(
    private readonly pontoMelhorarService: PontoMelhorarService
  ) {
    super();
  }

  /**
   * @swagger
   * /api/pontoMelhorar:
   *   get:
   *     tags:
   *       - PontoMelhorar
   *     description: Lista todos os pontos a melhorar
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um array de pontos a melhorar
   *          schema:
   *                $ref: '#/definitions/PontoMelhorar'
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */
  @httpGet("/")
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.pontoMelhorarService.listar());
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/pontoMelhorar:
   *   post:
   *     tags:
   *       - PontoMelhorar
   *     description: Salva um novo ponto a melhorar
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: ponto a melhorar
   *         description: Ponto a melhorar
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/PontoMelhorar'
   *     responses:
   *       200:
   *         description: Novo Ponto a Melhorar
   *         schema:
   *           $ref: '#/definitions/PontoMelhorar'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */

  @httpPost("/", ...postPontoMelhorarValidator)
  public async post(
    @requestBody() pontoMelhorar: PontoMelhorar
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.pontoMelhorarService.salvar(pontoMelhorar));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
