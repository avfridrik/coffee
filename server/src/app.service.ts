import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  // private readonly serialProvider: SerialService
  constructor() {}
  //public server = this.appGateway.server;
  get(): string {
    //
    const command = "V";
    console.log("command =>", command);
    //this.serialProvider.port.write(command + "\n");
    return "Get!";
  }

  put(): void {
    const command = "V";
    console.log("put =>", command);
    //port.write(command + "\n");
  }
}
