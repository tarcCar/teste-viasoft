import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { BasicModel } from "./basicModel";
import { PontoManter } from "./pontoManter";
import { PontoMelhorar } from "./pontoMelhorar";
import { Usuario } from "./usuario";
/**
 * @swagger
 * definitions:
 *   Feedback:
 *     properties:
 *       id:
 *         type: number
 *       feedBackFinal:
 *         type: string
 *       sugestoes:
 *         type: string
 *       usuarioOrigem:
 *         $ref: '#/definitions/Usuario'
 *         readOnly: true
 *       usuarioDestino:
 *         $ref: '#/definitions/Usuario'
 *       pontosManter:
 *         type: array
 *         items:
 *              $ref: '#/definitions/PontoManter'
 *       pontosMelhorar:
 *         type: array
 *         items:
 *              $ref: '#/definitions/PontoMelhorar'
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
export class Feedback extends BasicModel {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  public sugestoes!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  public feedBackFinal!: string;

  @ManyToOne((_) => Usuario, {
    nullable: false,
  })
  public usuarioOrigem: Usuario;

  @ManyToOne((_) => Usuario, {
    nullable: false,
  })
  public usuarioDestino: Usuario;

  @ManyToMany((_) => PontoManter, {
    cascade: ["insert", "update"],
  })
  @JoinTable()
  public pontosManter: PontoManter[];

  @ManyToMany((_) => PontoMelhorar, {
    cascade: ["insert", "update"],
  })
  @JoinTable()
  public pontosMelhorar: PontoMelhorar[];
}
