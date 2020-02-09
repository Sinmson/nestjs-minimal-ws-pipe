import { EnhanceWebsocketRequestPipe } from "./../../pipes/enhance-websocket-request.pipe/enhance-websocket-request.pipe";
import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Logger, UsePipes } from "@nestjs/common";

@WebSocketGateway({
  namespace: "chat"
})
export class ChatGateway {
  private logger: Logger = new Logger(ChatGateway.name);

  constructor() {
    this.logger.debug("constructor...");
  }

  @UsePipes(EnhanceWebsocketRequestPipe)
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: any, @MessageBody() payload: any) {
    this.logger.debug("handleMessage | payload: " + payload);
    client.emit("message", payload);
  }
}
