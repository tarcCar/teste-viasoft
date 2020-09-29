import path from "path";
import { createConnection, Connection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export async function getDbConnection(): Promise<Connection> {
  const DATABASE_DB = path.join(__dirname, "..", "db", "db.sqlite");

  const conn = await createConnection({
    type: "sqlite",
    database: DATABASE_DB,
    entities: ["src/models/*.ts"],
    synchronize: true,
    logging: process.env.NODE_ENV !== "PRODUCTION",
    namingStrategy: new SnakeNamingStrategy(),
  });

  return conn;
}
