import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notes } from "src/entities/notes.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private notesRepository: Repository<Notes>
  ) {}

  async getNotesData(req: any) {
    console.log(req.query);
    if (req.user.role === "admin") {
      if (req.query.user_id && req.query.user_id !== "all") {
        return this.notesRepository.find({
          where: { user: { id: req.query.user_id } },
        });
      } else {
        return this.notesRepository.find();
      }
    } else if (req.user.role === "science") {
      return this.notesRepository.find({
        where: { tag: "science" }, // Filter by user object
      });
    } else if (req.user.role === "technology") {
      return this.notesRepository.find({
        where: { tag: "technology" }, // Filter by user object
      });
    }
    const notes = await this.notesRepository.find({
      where: { user: { id: req.user.id } }, // Filter by user object
    });

    return notes;
    // return [];
  }

  async postNotesData(data: any, req: any) {
    try {
      // Validate incoming data
      if (!data.title || !data.description || !data.tag) {
        return {
          success: false,
          status: 400,
          message: "All fields are required.",
        }; // Return false success and validation error
      }

      // Create new note

      const note = new Notes();
      note.title = data.title;
      note.description = data.description;
      note.tag = data.tag;

      if (req.user.role === "admin") {
        note.user = data.user_id;
      } else {
        note.user = req.user.id;
      }

      // Save the note in the database
      const result = await this.notesRepository.save(note);

      // Return success response with data
      return {
        success: true,
        status: 200,
        message: "Note Added",
        data: result,
      };
    } catch (error) {
      // Error handling if something goes wrong
      console.error("Error saving note: ", error);
      return { success: false, status: 500, message: "Server Error" }; // Return false success and generic server error
    }
  }

  async updateNotesData(data: any, req: any, id: any) {
    const allowedRoles = ["science", "technology"];
    try {
      // Fetch the note by ID and ensure it belongs to the logged-in user

      if (req.user.role === "admin") {
        const note = await this.notesRepository.findOne({
          where: { id: id.id }, // Filter by note id and user id
        });
        note.title = data.title || note.title;
        note.description = data.description || note.description;
        note.tag = data.tag || note.tag;
        const result = await this.notesRepository.save(note);

        return { success: true, message: "Note Updated", data: result };
      } else if (allowedRoles.includes(req.user.role)) {
        const tag = req.user.role; // Dynamically set the tag based on user role
        const note = await this.notesRepository.findOne({
          where: { id: id.id, tag: tag }, // Filter by note id and tag
        });

        if (!note) {
          return { success: false, message: "Note not found" };
        }

        // Update note fields
        note.title = data.title || note.title;
        note.description = data.description || note.description;
        note.tag = data.tag || note.tag;

        const result = await this.notesRepository.save(note);

        return { success: true, message: "Note Updated", data: result };
      }

      const note = await this.notesRepository.findOne({
        where: { id: id.id, user: { id: req.user.id } }, // Filter by note id and user id
      });

      // If note not found, return a meaningful message
      if (!note) {
        return {
          success: false,
          message: "Note not found or unauthorized access",
        };
      }

      // Update the note data
      note.title = data.title || note.title;
      note.description = data.description || note.description;
      note.tag = data.tag || note.tag;

      // Save updated note
      const result = await this.notesRepository.save(note);

      return { success: true, message: "Note Updated", data: result };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while updating the note",
        error: error.message,
      };
    }
  }

  async deleteNotesData(req: any, id: any) {
    const allowedRoles = ["science", "technology"];
    try {
      // Find the note by ID and ensure it belongs to the logged-in user

      if (req.user.role === "admin") {
        await this.notesRepository.delete(id.id);
        return { success: true, message: "Note Deleted" };
      } else if (allowedRoles.includes(req.user.role)) {
        const tag = req.user.role; // Dynamically set the tag based on user role
        const note = await this.notesRepository.findOne({
          where: { id: id.id, tag: tag }, // Filter by note id and tag
        });

        if (!note) {
          return { success: false, message: "Note not found" };
        }

        // Delete the note
        await this.notesRepository.delete(id.id);
        return { success: true, message: "Note Deleted" };
      }

      const note = await this.notesRepository.findOne({
        where: { id: id.id, user: { id: req.user.id } }, // Filter by note id and user id
      });

      // If note not found, return a meaningful message
      if (!note) {
        return {
          success: false,
          message: "Note not found or unauthorized access",
        };
      }

      // Delete the note
      await this.notesRepository.delete(id.id);
      return { success: true, message: "Note Deleted" };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while deleting the note",
        error: error.message,
      };
    }
  }
}
