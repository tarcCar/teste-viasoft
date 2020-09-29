import { body } from "express-validator";
import {
  controller,
  httpPost,
  requestBody,
  interfaces,
} from "inversify-express-utils";

import { LoginForm, LoginService } from "@services/loginService";
import { Controller } from "@type/Controller";

const loginValidator = [
  body("login").notEmpty().withMessage("Login é obrigatório"),
  body("senha")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6 })
    .withMessage("Senha precisa pelo menos 6 caracteres"),
];

@controller("/api/login")
export class LoginController extends Controller {
  public constructor(private readonly loginService: LoginService) {
    super();
  }

  /**
   * @swagger
   * /api/login:
   *   post:
   *     tags:
   *       - Login
   *     description: Faz o login na aplicação retornando um token jwt que deve ser usuado para autenticação
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         description: login do usuario
   *         in: body
   *         required: true
   *         schema:
   *            type: object
   *            properties:
   *            login:
   *              type: string
   *              description: login do usuário
   *            senha:
   *              type: string
   *              decription: senha do usuário
   *     responses:
   *       200:
   *         description: login
   *         schema:
   *           type: object
   *           properties:
   *            nome:
   *              type: string
   *              description: nome do usuário
   *            token:
   *              type: string
   *              decription: token para autenticação
   *            id:
   *              type: number
   *              description: id do usuário
   *       400:
   *          description: Algum erro de válidação
   *       401:
   *          description: Token inválido
   *     security:
   *       - api_key
   */

  @httpPost("/", ...loginValidator)
  public async post(
    @requestBody() login: LoginForm
  ): Promise<interfaces.IHttpActionResult> {
    const errosValidacao = this.validationError();
    if (errosValidacao) {
      return errosValidacao;
    }
    try {
      const loginDTO = await this.loginService.login(login);
      if (loginDTO) return this.ok(loginDTO);

      return this.badRequest("Login ou senha inválidos");
    } catch (e) {
      console.log(e);
      return this.internalServerError(e.message);
    }
  }
}
