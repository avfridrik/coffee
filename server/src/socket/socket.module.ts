import { Module, Global, forwardRef } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { SocketGateway } from "./socket.gateway";
import { SerialModule } from "src/serial/serial.module";

@Global()
@Module({
  imports: [forwardRef(() => SerialModule)],
  providers: [SocketService, SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
