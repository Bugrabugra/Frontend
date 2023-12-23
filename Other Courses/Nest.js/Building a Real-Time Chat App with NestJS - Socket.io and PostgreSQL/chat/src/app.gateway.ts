import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { AppService } from "./app.service";
import { Server, Socket } from "socket.io";
import { Chat } from "./chat.entity";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class AppGateway {
  @WebSocketServer() server: Server;

  constructor(private appService: AppService) {}

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() chat: Chat,
    // @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.appService.createMessage(chat);
    this.server.emit("recMessage", chat);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }
}
