import crypto from "crypto";
import { injectable, inject } from "inversify";
import { Repository } from "typeorm";

import { TYPE_DI } from "@constants/typesInjecaoDependencia";
import { Usuario } from "@models/usuario";
import { generateToken } from "@utils/token";

export type LoginForm = {
  login: string;
  senha: string;
};

export type LoginDTO = {
  id: number;
  nome: string;
  token: string;
};

@injectable()
export class LoginService {
  public constructor(
    @inject(TYPE_DI.UsuarioRepository)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  public async login(login: LoginForm): Promise<LoginDTO | null> {
    const senha = crypto.createHash("sha256").update(login.senha).digest("hex");

    const usuario = await this.usuarioRepository.findOne({
      login: login.login,
      senha,
    });

    if (!usuario) return null;

    const token = await generateToken({ id: usuario.id });
    return {
      token,
      id: usuario.id,
      nome: usuario.nome,
    };
  }
}
