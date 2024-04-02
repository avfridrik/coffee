import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

//const portName = "/dev/ttyAMA0";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableCors({
    // add multiple origins here
    origin: true,
  });
  await app.listen(3001);
  //app.close();
}
bootstrap();
