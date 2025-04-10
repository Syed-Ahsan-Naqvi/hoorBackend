"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notes_entity_1 = require("../entities/notes.entity");
const typeorm_2 = require("typeorm");
let NotesService = class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    async getNotesData(req) {
        console.log(req.query);
        if (req.user.role === "admin") {
            if (req.query.user_id && req.query.user_id !== "all") {
                return this.notesRepository.find({
                    where: { user: { id: req.query.user_id } },
                });
            }
            else {
                return this.notesRepository.find();
            }
        }
        else if (req.user.role === "science") {
            return this.notesRepository.find({
                where: { tag: "science" },
            });
        }
        else if (req.user.role === "technology") {
            return this.notesRepository.find({
                where: { tag: "technology" },
            });
        }
        const notes = await this.notesRepository.find({
            where: { user: { id: req.user.id } },
        });
        return notes;
    }
    async postNotesData(data, req) {
        try {
            if (!data.title || !data.description || !data.tag) {
                return {
                    success: false,
                    status: 400,
                    message: "All fields are required.",
                };
            }
            const note = new notes_entity_1.Notes();
            note.title = data.title;
            note.description = data.description;
            note.tag = data.tag;
            if (req.user.role === "admin") {
                note.user = data.user_id;
            }
            else {
                note.user = req.user.id;
            }
            const result = await this.notesRepository.save(note);
            return {
                success: true,
                status: 200,
                message: "Note Added",
                data: result,
            };
        }
        catch (error) {
            console.error("Error saving note: ", error);
            return { success: false, status: 500, message: "Server Error" };
        }
    }
    async updateNotesData(data, req, id) {
        const allowedRoles = ["science", "technology"];
        try {
            if (req.user.role === "admin") {
                const note = await this.notesRepository.findOne({
                    where: { id: id.id },
                });
                note.title = data.title || note.title;
                note.description = data.description || note.description;
                note.tag = data.tag || note.tag;
                const result = await this.notesRepository.save(note);
                return { success: true, message: "Note Updated", data: result };
            }
            else if (allowedRoles.includes(req.user.role)) {
                const tag = req.user.role;
                const note = await this.notesRepository.findOne({
                    where: { id: id.id, tag: tag },
                });
                if (!note) {
                    return { success: false, message: "Note not found" };
                }
                note.title = data.title || note.title;
                note.description = data.description || note.description;
                note.tag = data.tag || note.tag;
                const result = await this.notesRepository.save(note);
                return { success: true, message: "Note Updated", data: result };
            }
            const note = await this.notesRepository.findOne({
                where: { id: id.id, user: { id: req.user.id } },
            });
            if (!note) {
                return {
                    success: false,
                    message: "Note not found or unauthorized access",
                };
            }
            note.title = data.title || note.title;
            note.description = data.description || note.description;
            note.tag = data.tag || note.tag;
            const result = await this.notesRepository.save(note);
            return { success: true, message: "Note Updated", data: result };
        }
        catch (error) {
            return {
                success: false,
                message: "An error occurred while updating the note",
                error: error.message,
            };
        }
    }
    async deleteNotesData(req, id) {
        const allowedRoles = ["science", "technology"];
        try {
            if (req.user.role === "admin") {
                await this.notesRepository.delete(id.id);
                return { success: true, message: "Note Deleted" };
            }
            else if (allowedRoles.includes(req.user.role)) {
                const tag = req.user.role;
                const note = await this.notesRepository.findOne({
                    where: { id: id.id, tag: tag },
                });
                if (!note) {
                    return { success: false, message: "Note not found" };
                }
                await this.notesRepository.delete(id.id);
                return { success: true, message: "Note Deleted" };
            }
            const note = await this.notesRepository.findOne({
                where: { id: id.id, user: { id: req.user.id } },
            });
            if (!note) {
                return {
                    success: false,
                    message: "Note not found or unauthorized access",
                };
            }
            await this.notesRepository.delete(id.id);
            return { success: true, message: "Note Deleted" };
        }
        catch (error) {
            return {
                success: false,
                message: "An error occurred while deleting the note",
                error: error.message,
            };
        }
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notes_entity_1.Notes)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map