import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { SocketGateway } from "src/socket/socket.gateway";
import { SocketService } from "src/socket/socket.service";
//@Inject(forwardRef(() => SocketGateway)) private readonly socketGateway: SocketGateway
@Injectable()
export class SerialService {
  portName = "/dev/tty.usbmodem01";
  port;
  constructor(
    @Inject(forwardRef(() => SocketGateway))
    private readonly socketGateway: SocketGateway
  ) {
    this.port = new SerialPort(
      {
        path: this.portName,
        baudRate: 115200,
        dataBits: 8,
        parity: "none",
        stopBits: 1,
      },
      (err) => {
        if (err) {
          console.error(err);
          // Handle Error
        }
        console.log("success");
      }
    );
    const parser = new ReadlineParser({ delimiter: "\r\n" });
    this.port.pipe(parser);

    this.port.on("open", () => {
      console.info("port opened");
    });

    parser.on("data", (data) => {
      console.log("parser => ", data);
      this.socketGateway.server.emit("command", { command: data });
      // Data is string, process your data below!
    });
  }
  // I'm using Readline parser here. But, You can change parser that you want!
}
