import { Notes } from "src/entities/notes.entity";
import { Repository } from "typeorm";
export declare class NotesService {
    private notesRepository;
    constructor(notesRepository: Repository<Notes>);
    getNotesData(req: any): Promise<Notes[]>;
    postNotesData(data: any, req: any): Promise<{
        success: boolean;
        status: number;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: number;
        message: string;
        data: Notes;
    }>;
    updateNotesData(data: any, req: any, id: any): Promise<{
        success: boolean;
        message: string;
        data: Notes;
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
