import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://prismatic-cat-a9dac9.netlify.app/",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,token",
      credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
bootstrap();
