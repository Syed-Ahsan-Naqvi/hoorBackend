import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { LoggerMiddleware } from "src/middlewares/authFetchUserData.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notes } from "src/entities/notes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/api/notes");
  }
}
