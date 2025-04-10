import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { NotesService } from "src/notes/notes.service";
import { Req } from "@nestjs/common";

@Controller("/api/notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get("/")
  async getNotesData(@Req() req: any) {
    return this.notesService.getNotesData(req);
  }

  @Post("/createNote")
  async postNotesData(@Body() data: any, @Req() req: any) {
    return this.notesService.postNotesData(data, req);
  }

  @Put("/updateNote/:id")
  async updateNotesData(@Body() data: any, @Req() req: any, @Param() id: any) {
    return this.notesService.updateNotesData(data, req, id);
  }

  @Delete("/deleteNote/:id")
  async deleteNotesData(@Req() req: any, @Param() id: any) {
    return this.notesService.deleteNotesData(req, id);
  }
}
