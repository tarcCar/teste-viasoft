import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import { BasicModel } from "./basicModel";
/**
 * @swagger
 * definitions:
 *   PontoManter:
 *     properties:
 *       id:
 *         type: number
 *       descricao:
 *         type: string
 *       criadoEm:
 *         type: string
 *         format: date-time
 *         readOnly: true
 *       alteradoEm:
 *         type: string
 *         format: date-time
 *         readOnly: true
 */
@Entity()
export class PontoManter extends BasicModel {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public descricao!: string;

  @BeforeInsert()
  @BeforeUpdate()
  descricaoParaMaiuscula(): void {
    if (this.descricao) this.descricao = this.descricao.toUpperCase();
  }
}
