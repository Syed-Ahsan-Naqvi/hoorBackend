import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,token",
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  // setInterval(() => {
  //   const used = process.memoryUsage();
  //   console.log(`🧠 Memory Usage:
  //     - RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB
  //     - Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB
  //     - Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
  //     - External: ${(used.external / 1024 / 1024).toFixed(2)} MB`);
  // }, 500);
}
bootstrap();
