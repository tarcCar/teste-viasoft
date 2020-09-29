import jwt from "jsonwebtoken";

export type TokenData = {
  id: number;
};

const secretJwt =
  process.env.SECRET_JWT || "goiabailuminattivoadoracomcaimbranaorelha";

export function getTokenFromHeader(header: string): string {
  if (!header || !header.includes("Bearer ")) return null;

  const token = header.split("Bearer ")[1];
  return token;
}

export function verifyToken(token: string): Promise<TokenData> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretJwt,
      {
        algorithms: ["HS256"],
      },
      (err: jwt.VerifyErrors, decoded: TokenData) => {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
}

export function generateToken(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretJwt,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}
