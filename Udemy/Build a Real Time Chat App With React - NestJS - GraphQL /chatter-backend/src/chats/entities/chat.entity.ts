import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractEntity } from "../../common/database/abstract.entity";
import { Prop } from "@nestjs/mongoose";
import { Message } from "../messages/entities/message.entity";

@ObjectType()
export class Chat extends AbstractEntity {
  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;
}
