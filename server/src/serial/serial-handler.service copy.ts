import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export const SerialHandlerService = () => {
  const portName = "/dev/tty.usbmodem01";
  const port = new SerialPort(
    {
      path: portName,
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
  // I'm using Readline parser here. But, You can change parser that you want!
  const parser = new ReadlineParser({ delimiter: "\r\n" });
  port.pipe(parser);

  port.on("open", () => {
    console.info("port opened");
  });

  parser.on("data", (data) => {
    console.log(data);
    // Data is string, process your data below!
  });
};
