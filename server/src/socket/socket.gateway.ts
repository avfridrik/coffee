import { Inject, Injectable, forwardRef } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { Server } from "socket.io";
import { SerialService } from "src/serial/serial.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
@Injectable()
export class SocketGateway {
  @WebSocketServer()
  public server: Server;
  // @Inject(forwardRef(() => SerialService)) private readonly serialProvider: SerialService;

  constructor(
    @Inject(forwardRef(() => SerialService))
    private readonly serialProvider: SerialService
  ) {}

  @SubscribeMessage("command")
  command(@MessageBody() { command }: { command: string }): Promise<void> {
    console.log("command =>", command);
    this.serialProvider.port.write(command + "\n");
    return;
  }
}
