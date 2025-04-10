export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
    deleteImage(imageUrl: string): Promise<void>;
}
