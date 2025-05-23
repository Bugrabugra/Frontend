import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async createMessage(chat: Chat): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}
