import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint"
  })
  id: number;

  @Column({
    nullable: false,
    default: ""
  })
  username: string;

  @Column({
    nullable: true,
    default: ""
  })
  email: string;

  @Column({
    nullable: false,
    default: ""
  })
  password: string;
}
