import * as ioClient from "socket.io-client";
import { Logger } from "@nestjs/common";

const logger: Logger = new Logger("mockWsClient.ts");

const socket = ioClient("http://localhost:3000/chat");

socket.on('connect', function(){
  logger.debug("connected!");
  logger.debug("Send test message...");
  socket.emit("message", "Test message");
});
socket.on('message', function(data){
  logger.debug("received message | data: " + JSON.stringify(data));
});
socket.on('disconnect', function(){
  logger.debug("disconnected!");
});

logger.debug("Connect...");
socket.connect();