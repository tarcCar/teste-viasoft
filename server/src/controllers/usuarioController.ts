import { body } from "express-validator";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";

import { authMiddleware } from "@middlewares/authMiddleware";
import { Usuario } from "@models/usuario";
import { UsuarioService } from "@services/usuarioService";
import { Controller } from "@type/Controller";

const postUsuarioValidator = [
  body("nome")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3 })
    .withMessage("Nome precisa pelo menos 3 caracteres"),
  body("login").notEmpty().withMessage("Login é obrigatório"),
  body("senha")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6 })
    .withMessage("Senha precisa pelo menos 6 caracteres"),
];

@controller("/api/usuario")
export class UsuarioController extends Controller {
  public constructor(private readonly usuarioService: UsuarioService) {
    super();
  }

  /**
   * @swagger
   * /api/usuario:
   *   get:
   *     tags:
   *       - Usuario
   *       - Admin
   *     description: Lista todos os usuarios
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: Um array de usuarios
   *          schema:
   *                $ref: '#/definitions/Usuario'
   *       401:
   *          description: Token inválido
   *       405:
   *          description: Token é válido porém sem permissão
   *     security:
   *       - api_key
   */
  @httpGet("/", authMiddleware())
  public async get(): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.usuarioService.listar());
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }

  /**
   * @swagger
   * /api/usuario:
   *   post:
   *     tags:
   *       - Usuario
   *       - Admin
   *     description: Salva um nova Usuario
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: usuario
   *         description: Usuario
   *         in: body
   *         required: true
   *         schema:
   *             $ref: '#/definitions/Usuario'
   *     responses:
   *       200:
   *         description: Novo Usuario
   *         schema:
   *           $ref: '#/definitions/Usuario'
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *       405:
   *          description: Token é válido porém sem permissão
   *     security:
   *       - api_key
   */

  @httpPost("/", ...postUsuarioValidator)
  public async post(
    @requestBody() usuario: Usuario
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      return this.ok(await this.usuarioService.salvar(usuario));
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
