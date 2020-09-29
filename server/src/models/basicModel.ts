import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicModel {
  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  alteradoEm: Date;
}
