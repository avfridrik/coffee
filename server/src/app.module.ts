import { Module } from "@nestjs/common";
import { SerialModule } from "./serial/serial.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SocketModule } from "./socket/socket.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [SerialModule, SocketModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
