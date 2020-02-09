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

  // does not work
  @UsePipes(EnhanceWebsocketRequestPipe) // <- comment this out and function will get called
  @SubscribeMessage('message')
  handleMessage_willNeverGetCalled(@ConnectedSocket() client: any, @MessageBody() payload: any) {
    this.logger.debug("handleMessage_willNeverGetCalled | payload: " + payload);
    client.emit("message", payload);
  }

  // works
  @SubscribeMessage('message') 
  handleMessage(@ConnectedSocket() client: any, @MessageBody(EnhanceWebsocketRequestPipe) payload: any) { 
    this.logger.debug("handleMessage | payload: " + payload); // '-> using the pipe here does the trick
    client.emit("message", payload);
  }
}
