import { ISession } from "connect-typeorm";
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn
} from "typeorm";

@Entity({ name: "sessions" })
export class SessionEntity implements ISession {
  @Index()
  @Column("bigint")
  expiredAt = Date.now();

  @PrimaryColumn("varchar", { length: 255 })
  id = "";

  @Column({ type: "text" })
  json = "";

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  destroyedAt?: Date;
}
