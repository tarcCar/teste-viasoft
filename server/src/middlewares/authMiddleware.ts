import * as express from "express";

import { getTokenFromHeader, verifyToken } from "@utils/token";

function authMiddlewareFactory() {
  return () => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      (async () => {
        const header = req.headers.authorization as string;
        const token = getTokenFromHeader(header);

        if (token === null) {
          res.status(401).send("Token inválido");
        } else {
          try {
            await verifyToken(token);
            next();
          } catch (error) {
            console.log(error);
            res.status(401).send("Token inválido");
          }
        }
      })();
    };
  };
}

const authMiddleware = authMiddlewareFactory();

export { authMiddleware };
