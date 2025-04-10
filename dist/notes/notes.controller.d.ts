import { NotesService } from "src/notes/notes.service";
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getNotesData(req: any): Promise<import("../entities/notes.entity").Notes[]>;
    postNotesData(data: any, req: any): Promise<{
        success: boolean;
        status: number;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: number;
        message: string;
        data: import("../entities/notes.entity").Notes;
    }>;
    updateNotesData(data: any, req: any, id: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/notes.entity").Notes;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteNotesData(req: any, id: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
